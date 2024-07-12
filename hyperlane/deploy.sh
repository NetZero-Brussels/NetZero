hyperlane core deploy --dry-run chain1 \ 
    --from-address 0xd1D1B8F0B6740fad9Fb4166EeEEFEDDB84770938 \ # (optional) your account address to be impersonated via Anvil; defaults to the HYP_KEY env variable
    --registry \ # (optional) path to your primary registry; defaults to the Hyperlane github registry
    --overrides # (optional) path to a override registry; defaults to the local ./ path
