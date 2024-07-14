# NetZero

## Introduction
Engaging Communities to Combat Climate Change with Transparency and Ease.

The problems we want to solve:
- Reality: Measuring and offsetting carbon emissions is difficult for companies, and climate projects face low funding and awareness.
- Social: The CSRD makes sustainability reporting challenging for EU companies, highlighting the need for better solutions to generate carbon footprint data and offset emissions.
- Technical: Web2 solutions lack transparency and scalability.

## How it works:
- Gamification: Engaging users with leaderboards and point systems, streaks, challenge other users with greener lifestyles.
- Crowdfunding: Facilitating contributions to green initiatives. 
- Proof and Verifiability: Ensuring transparency with a tamper-proof system. 
- Reputation: Creating green proofs and approval stamps for carbon footprints.

## Key Features:
- Leaderboard to encourage competition and engagement. 
- GPS integration for accurate, private data. 
- Distribution system for donations to green projects. 
- Seamless transactions on chain + transparent flow of funds stored in vault.
- Highly accurate mathematical models for footprint.

"The global carbon offset market is projected to reach $200 billion by 2030."

Producing carbon emission services could be challenging, for example:
- Carbon emission reports
- AI for data analytics
- Affordable monthly subscriptions
...but not using it can be very expensive for companies

For next steps: we will test with users for Feedback Integration
Reach out to climate projects & organizations such as https://www.energyweb.org/
Finish our MVP build up


## Sponsors
Celo Minipay: Seamless onboarding, on ramp and gasless transfers.
The Graph: A new Net Zero Subgraph will be created for feeding notifications to the end user on funds, emission offsets, donations.
Flare:  Data audit for carbon emission counters and authenticity of the data origin
Arbitrum Stylus: Efficient, low-latency on-chain calculations of carbon emissions including advanced maths libraries for trust and transparency.
Hyperlane: Interoperability between Celo and Arbitrum for optimal transparency and reputation management.
Blockscout: Contract verification and user receipts.

## Architecture
![netZero drawio](https://github.com/user-attachments/assets/f2b8c81f-658b-4c68-ad29-974f46bc89b4)

## Project Stucture
co2-verifier - a node server with a cronjob to update carbon emission factors every hr from flare validator
hyperlane - bridge configurations for celo and arbitrum deployments. A setup for a user agent with multisig setup
foundry - a foundry project to hold all contracts on arbitrum, celo			
net-zero - A web app frontend to be rendered within minipay
stylus - a rust contract with floating arithmetic operatons to calculate carbon offsets/emissions

## How to

## Smart contracts
Celo:
User registry:
Celo router

Arbitrum:




