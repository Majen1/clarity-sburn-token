;; sBurn Coin - SIP-010 implementation 
;; Written by Majen 
;; Created: 2025

(use-trait ft-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)
(impl-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)

;; FT with a maximum supply
(define-fungible-token sBurn-coin u1800000000000000) ;; 18 million tokens with 8 decimals

;; Error Codes
(define-constant ERR_INSUFFICIENT_TRANSFER (err u101))
(define-constant ERR_NOT_TOKEN_OWNER (err u102))
(define-constant ERR_INVALID_RECIPIENT (err u103))
(define-constant ERR_INSUFFICIENT_BALANCE (err u104))
(define-constant ERR_ZERO_AMOUNT (err u105))
(define-constant ERR_SELF_TRANSFER (err u106))
(define-constant ERR_MAX_SUPPLY_REACHED (err u107))
(define-constant ERR_ARITHMETIC_OVERFLOW (err u108))
(define-constant ERR_UNAUTHORIZED_MINTER (err u109))
(define-constant ERR_METADATA_FAILURE (err u110))

;; Constants for contract
(define-constant CONTRACT_OWNER 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8) ;; Dedicated contract owner wallet
(define-constant FEE_RECIPIENT 'ST1Y2465GZ3YNX9SA316W5SXSEQM21SBVPY3QNH1E) ;; leather wallet address
(define-constant BURN_ADDRESS 'ST000000000000000000002AMW42H) ;; testnet burn address
(define-constant TOKEN_URI u"")
(define-constant TOKEN_NAME "sBurn")
(define-constant TOKEN_SYMBOL "SBURN")
(define-constant TOKEN_DECIMALS u8)
(define-constant MAX_SUPPLY u1800000000000000) ;; 18 million with 8 decimals (like Bitcoin)
(define-constant FEE_BASIS_POINTS u25) ;; 0.25% (25 basis points)
(define-constant FEE_SPLIT_RATIO u40) ;; 40% of fee to recipient, 60% to burn (0.1% / 0.15%)
(define-constant MIN_TRANSFER_AMOUNT u1000) ;; 0.00001 tokens with 8 decimal places

;; Storage Variables
(define-data-var total-burned uint u0)
(define-data-var total-fees-collected uint u0)
(define-data-var total-minted uint u0)

;; Fee Calculation Helper
(define-private (calculate-fee (amount uint))
    ;; 25 basis points = 0.25% = 25/10000
    (/ (* amount FEE_BASIS_POINTS) u10000))

;; Calculate fee split between recipient and burn
(define-private (calculate-fee-split (fee uint))
    (let (
        (recipient-fee (/ (* fee FEE_SPLIT_RATIO) u100))
        (burn-amount (- fee recipient-fee))
    )
        {recipient-fee: recipient-fee, burn-amount: burn-amount}
    ))

;; SIP-010 Functions
(define-read-only (get-balance (account principal))
    (ok (ft-get-balance sBurn-coin account)))

(define-read-only (get-total-supply)
    (ok (ft-get-supply sBurn-coin)))

(define-read-only (get-name)
    (ok TOKEN_NAME))

(define-read-only (get-symbol)
    (ok TOKEN_SYMBOL))

(define-read-only (get-decimals)
    (ok TOKEN_DECIMALS))

(define-read-only (get-token-uri)
    (ok (some TOKEN_URI)))

;; Public mint function - Only contract owner can mint tokens
(define-public (mint (amount uint))
    (begin
        ;; Validate input parameters
        (asserts! (> amount u0) ERR_ZERO_AMOUNT)
        
        ;; Only contract owner can mint tokens
        (asserts! (is-eq contract-caller CONTRACT_OWNER) ERR_UNAUTHORIZED_MINTER)
        
        ;; Check that minting won't exceed max supply
        (let ((current-supply (ft-get-supply sBurn-coin))
              (potential-new-supply (+ current-supply amount)))
            
            ;; Explicit overflow check
            (asserts! (>= potential-new-supply current-supply) ERR_ARITHMETIC_OVERFLOW)
            (asserts! (<= potential-new-supply MAX_SUPPLY) ERR_MAX_SUPPLY_REACHED)
            
            ;; Check that total minted won't overflow
            (let ((new-total-minted (+ (var-get total-minted) amount)))
                (asserts! (>= new-total-minted (var-get total-minted)) ERR_ARITHMETIC_OVERFLOW)
                
                ;; Update total minted
                (var-set total-minted new-total-minted)
                
                ;; Mint the tokens directly to the caller
                (ft-mint? sBurn-coin amount tx-sender)
            )
        )
    ))

;; Transfer Function with Fee Distribution (No Memo)
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (let (
        (fee (calculate-fee amount))
        (fee-split (calculate-fee-split fee))
        (recipient-fee (get recipient-fee fee-split))
        (burn-amount (get burn-amount fee-split))
        (transfer-amount (- amount fee))  ;; Recipient gets amount minus total fees
    )
        ;; Ensure inputs are valid
        (asserts! (> amount u0) ERR_ZERO_AMOUNT)
        (asserts! (not (is-eq sender recipient)) ERR_SELF_TRANSFER)
        
        ;; Ensure the sender has enough balance for the transfer
        (let ((sender-balance (ft-get-balance sBurn-coin sender)))
            (asserts! (>= sender-balance amount) ERR_INSUFFICIENT_BALANCE)
        )
        
        ;; Ensure transfer amount is above the minimum allowed
        (asserts! (>= amount MIN_TRANSFER_AMOUNT) ERR_INSUFFICIENT_TRANSFER)
        (asserts! (or (is-eq contract-caller sender)) ERR_NOT_TOKEN_OWNER)
        
        ;; Ensure recipient is not the burn address
        (asserts! (not (is-eq recipient BURN_ADDRESS)) ERR_INVALID_RECIPIENT)
        
        ;; Explicit check to prevent potential underflow
        (asserts! (>= amount fee) ERR_ARITHMETIC_OVERFLOW)
        (asserts! (>= fee recipient-fee) ERR_ARITHMETIC_OVERFLOW)
        
        ;; First do the main transfer to recipient
        (try! (ft-transfer? sBurn-coin transfer-amount sender recipient))
        ;; Then transfer fee portion to fee recipient
        (try! (ft-transfer? sBurn-coin recipient-fee sender FEE_RECIPIENT))
        ;; Finally transfer burn amount to burn address
        (try! (ft-transfer? sBurn-coin burn-amount sender BURN_ADDRESS))
        
        ;; Update total burned and total fees with overflow protection
        (let (
            (new-total-burned (+ (var-get total-burned) burn-amount))
            (new-total-fees (+ (var-get total-fees-collected) fee))
        )
            ;; Check for overflows
            (asserts! (>= new-total-burned (var-get total-burned)) ERR_ARITHMETIC_OVERFLOW)
            (asserts! (>= new-total-fees (var-get total-fees-collected)) ERR_ARITHMETIC_OVERFLOW)
            
            ;; Update state
            (var-set total-burned new-total-burned)
            (var-set total-fees-collected new-total-fees)
        )
        
        (ok true)))

;; Additional Read-Only Functions
(define-read-only (get-total-burned)
    (ok (var-get total-burned)))

(define-read-only (get-burn-rate)
    (ok (/ (* FEE_BASIS_POINTS (- u100 FEE_SPLIT_RATIO)) u100)))

(define-read-only (get-fee-rate)
    (ok (/ (* FEE_BASIS_POINTS FEE_SPLIT_RATIO) u100)))

(define-read-only (get-effective-supply)
    (ok (- (ft-get-supply sBurn-coin) (var-get total-burned))))

(define-read-only (get-total-fees-collected)
    (ok (var-get total-fees-collected)))

(define-read-only (get-max-supply)
    (ok MAX_SUPPLY))

(define-read-only (get-remaining-supply)
    (ok (- MAX_SUPPLY (var-get total-minted))))

(define-read-only (get-circulating-supply)
    (ok (- (var-get total-minted) (var-get total-burned))))

;; Functional on-chain metadata that leverages existing read-only functions
(define-read-only (get-metadata)
    
    (ok {
        name: TOKEN_NAME,
        symbol: TOKEN_SYMBOL,
        decimals: TOKEN_DECIMALS,
        description: "sBurn is a 100% on-chain deflationary token on the Stacks blockchain with a fixed maximum supply of 18 million tokens (with 8 decimal places). It implements automatic fee distribution and burn mechanics with no external dependencies. With every transfer, a small fee is collected where 0.15% is burned permanently and 0.1% is distributed to fee recipients, creating a continuously decreasing supply that adds value to long-term holders.",
        properties: {
            burn-rate: "0.15%",  
            fee-rate: "0.1%",
            total-fee: "0.25%",
            min-transfer: "1000",
            max-supply: "1800000000000000"
        },

        stats: {
            total-burned: (unwrap! (get-total-burned) ERR_METADATA_FAILURE),
            total-fees: (unwrap! (get-total-fees-collected) ERR_METADATA_FAILURE),
            effective-supply: (unwrap! (get-effective-supply) ERR_METADATA_FAILURE),
            max-supply: MAX_SUPPLY,
            remaining-mintable: (unwrap! (get-remaining-supply) ERR_METADATA_FAILURE),
            circulating-supply: (unwrap! (get-circulating-supply) ERR_METADATA_FAILURE)
        }
    }))