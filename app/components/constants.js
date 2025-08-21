
export const faqQuestions = [
    {
      "question": "What is Abstract",
      "answer": "Abstract Chain is a Layer-2 blockchain built on Ethereum, designed to simplify cryptocurrency interactions for consumers, offers lower transaction fees and faster speeds compared to Ethereum's mainnet."
    },
    {
      "question": "What is $DPENGU?",
      "answer": "Dark Pengu is a community-driven meme token built on the Abstract blockchain. Our goal is to create the embodiment of abstracts dark mode throguh this coin, combined with the best meme coin community on abstract. Its just matter of time, darkness is here."
    },
    {
      "question": "Why Dark Pengu?",
      "answer": "A creature made of darkness and ruler of the void. There’s nowhere on the blockchain to hide from him, you don’t find Dark Pengu — he finds you! Moving at the speed of dark, spreading shadows all around him. Many have tried to escape, none have succeeded."
    },
    {
      "question": "How can I buy Dark Pengu?",
      "answer": "You can purchase Dark Pengu on any Abstract-compatible DEX. Simply connect your wallet (MetaMask, Trust Wallet, etc.), select DPengu/WETH, enter the amount, and swap."
    },
    {
      "question": "Who is behind this coin?",
      "answer": "Dark Pengu was conceived by a group of blockchain enthusiasts and developers who wanted to merge fun meme culture with serious DeFi utility. The core team is fully pseudonymous but active in our Discord and Telegram. Join us to chat with the $DPengu fam, ask questions, and participate in governance votes!"
    }
  ]

export const steps = [
  {
    title: "Step One",
    description:
      "Set up a wallet that works with the Abstract network. Use either Abstract Global Wallet or other compatible wallets ",
    links: [
      { href: "https://abs.xyz", text: "abs.xyz" },
      { href: "https://metamask.io", text: "Metamask" },
      { href: "https://rabby.io/", text: "Rabby" },
    ],
    extra: ". Make sure you wallet is secure before moving to next step.",
    image: "@/public/art/how-to-buy/card1.png",
    reverse: false,
  },
  {
    title: "Step Two",
    description:
      "Add ETH to your wallet. If your ETH is currently on another network such as Ethereum Mainnet, first ensure it’s stored in the wallet you set up in Step One. You’ll move it over to Abstract in the next step.",
    image: "@/public/art/how-to-buy/card2.png",
    reverse: true,
  },
  {
    title: "Step Three",
    description:
      "Bridge your ETH from Ethereum Mainnet to the Abstract chain. The official Abstract bridge, available through the",
    links: [{ href: "https://abs.xyz", text: "abs.xyz" }],
    extra: " portal.",
    image: "@/public/art/how-to-buy/card3.png",
    reverse: false,
  },
  {
    title: "Step Four",
    description:
      "Once your ETH is on the Abstract network, you can trade it for",
    links: [{ href: "#", text: "$DPENFU" }],
    extra:
      " through an Abstract-supported DEX, or by swapping directly within the Abstract Global Wallet if supported.",
    image: "@/public/art/how-to-buy/card4.png",
    reverse: true,
  },
]

