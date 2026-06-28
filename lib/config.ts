export const CONFIG = {
  // Global ClickBank/Affiliate Link
  // CHANGE THIS SINGLE VALUE TO UPDATE ALL CTAS ON THE SITE
  AFFILIATE_URL: "https://72d7fg1er50vavbk28pks1sve4.hop.clickbank.net/?tid=affiliate",

  siteName: "Joint Genesis™",
  domain: "https://en-jointgenesis.com",
  supportEmail: "support@biodynamix.co",
  supportPhone: "1-800-473-5188",
  supportAddress: "BioDynamix, 285 Northeast Ave, Tallmadge, OH 44278",
  manufacturer: "BioDynamix",
  creator: "Dr. Mark Weis",

  // Pricing Packages
  packages: [
    {
      id: "1-bottle",
      name: "1 Bottle",
      supply: "30-Day Supply",
      pricePerBottle: 59,
      originalPrice: 129,
      totalPrice: 59,
      shipping: "9.95 Shipping",
      shippingFee: 9.95,
      popular: false,
      bestValue: false,
      savings: 70,
      description: "Perfect for testing the formula and feeling initial joint stiffness relief.",
      bonuses: []
    },
    {
      id: "6-bottles",
      name: "6 Bottles",
      supply: "180-Day Supply",
      pricePerBottle: 39,
      originalPrice: 774,
      totalPrice: 234,
      shipping: "FREE US SHIPPING",
      shippingFee: 0,
      popular: false,
      bestValue: true,
      savings: 540,
      description: "Our recommended package. Rejuventates joint fluid completely and locks in the lowest rate.",
      bonuses: [
        "Free Bonus Ebook 1: 17 Joint Supporting Smoothies",
        "Free Bonus Ebook 2: Youthful Joints for Life"
      ]
    },
    {
      id: "3-bottles",
      name: "3 Bottles",
      supply: "90-Day Supply",
      pricePerBottle: 49,
      originalPrice: 387,
      totalPrice: 147,
      shipping: "FREE US SHIPPING",
      shippingFee: 0,
      popular: true,
      bestValue: false,
      savings: 240,
      description: "Highly recommended for restoring flexibility and lubricating synovial fluid.",
      bonuses: [
        "Free Bonus Ebook 1: 17 Joint Supporting Smoothies",
        "Free Bonus Ebook 2: Youthful Joints for Life"
      ]
    }
  ],

  // Core Ingredients
  ingredients: [
    {
      id: "mobilee",
      name: "Mobilee®",
      scientificName: "Hyaluronic Acid Rich Extract",
      dose: "80 mg",
      tagline: "Clinically proven to multiply joint fluid hyaluronan by 10x",
      description: "Mobilee® is a patented, natural extract rich in hyaluronic acid, polysaccharides, and collagen. Clinical trials demonstrate it is 10 times more effective than standard poultry-derived hyaluronic acid. It directly restores moisture to dry, thinning joint fluid.",
      benefits: [
        "Increases synovial fluid hyaluronan concentration",
        "Reduces joint discomfort and swelling",
        "Improves muscle strength and joint mobility"
      ],
      image: "/ingredients/mobilee.webp"
    },
    {
      id: "pine-bark",
      name: "French Maritime Pine Bark",
      scientificName: "Pinus pinaster extract",
      dose: "150 mg",
      tagline: "One of the world's most powerful antioxidants",
      description: "French Maritime Pine Bark Extract is highly standardized to contain active proanthocyanidins. It works synergistically with Mobilee®, fighting oxidative stress and helping active nutrients diffuse deep into the joint cartilage and synovial fluid.",
      benefits: [
        "Combats chronic joint inflammation and swelling",
        "Supports healthy circulation and blood flow to joint tissues",
        "Shown to improve joint flex and ease walking distances in clinical studies"
      ],
      image: "/ingredients/pine-bark.webp"
    },
    {
      id: "ginger-root",
      name: "Ginger Root",
      scientificName: "Zingiber officinale",
      dose: "200 mg",
      tagline: "Combats joint discomfort and inflammatory enzymes",
      description: "Used for centuries in traditional medicine, ginger contains active gingerols and shogaols. It blocks key inflammatory compounds (like PGE2) and works as an organic shield protecting chondrocytes (cartilage cells) from degrading.",
      benefits: [
        "Promotes a healthy inflammatory response in the joints",
        "Enhances absorption of other key active ingredients",
        "Reduces morning joint stiffness and enhances recovery"
      ],
      image: "/ingredients/ginger.webp"
    },
    {
      id: "boswellia-serrata",
      name: "Boswellia Serrata",
      scientificName: "Frankincense extract",
      dose: "100 mg",
      tagline: "Clinically proven to preserve cartilage tissue",
      description: "Boswellia Serrata yields active boswellic acids (specifically AKBA) that block the 5-LOX enzyme, which is responsible for joint lining breakdown. It helps maintain the thickness of synovial cartilage and reduces structural damage.",
      benefits: [
        "Inhibits cartilage-degrading enzymes",
        "Relieves discomfort during weight-bearing activities",
        "Improves physical function and joint flexion"
      ],
      image: "/ingredients/boswellia.webp"
    },
    {
      id: "bioperine",
      name: "BioPerine®",
      scientificName: "Black pepper extract (Piper nigrum)",
      dose: "5 mg",
      tagline: "Boosts bioavailability and absorption by up to 60%",
      description: "BioPerine® is a patented black pepper extract standardized to 95% piperine. It acts as a bio-enhancer that improves the thermogenic action of cells, allowing the body to absorb the other joint-supporting ingredients rapidly.",
      benefits: [
        "Magnifies absorption rate of Mobilee® and Pine Bark",
        "Maximizes the clinical efficacy of the formula",
        "Ensures nutrients survive digestive acids and reach the bloodstream"
      ],
      image: "/ingredients/bioperine.webp"
    }
  ],

  // Site FAQ
  faqs: [
    {
      id: "faq-safe-use",
      question: "Is Joint Genesis safe for long-term use?",
      answer: "Yes! Every ingredient is 100% natural and tested for purity. Our formula contains no stimulants, no dependency-forming drugs, and no common allergens like soy or dairy. It is manufactured in an FDA-inspected, GMP-certified facility."
    },
    {
      id: "faq-expect-results",
      question: "How soon can I expect results?",
      answer: "Most users report a significant reduction in stiffness within the first 7 to 10 days. However, the best results occur after 30 to 60 days of consistent use as the synovial fluid levels reach their peak"
    },
    {
      id: "faq-dosage",
      question: "What is the recommended dosage?",
      answer: "Simply take two small, easy-to-swallow capsules once per day with a glass of water. For maximum absorption, take them with your largest meal of the day."
    },
    {
      id: "faq-medications",
      question: "Can I take Joint Genesis™ alongside other medications or supplements?",
      answer: "While our ingredients are natural, we always recommend consulting with your physician before starting any new supplement regimen, especially if you are currently taking blood thinners or diabetes medication."
    },
    {
      id: "faq-where-to-buy",
      question: "Where to Buy Joint Genesis?",
      answer: "You can purchase the Joint Genesis supplement directly from the Joint Genesis Official Website ! for the best deals and authenticity."
    },
    {
      id: "faq-shipping",
      question: "What is the estimated delivery and shipping time?",
      answer: "All US orders are shipped via UPS or USPS within 24 hours. Most customers receive their package within 3 to 5 business days. International shipping may take 7 to 14 days."
    }
  ]
};
