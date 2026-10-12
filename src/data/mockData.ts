import { Creator, ProjectBrief, TimecodedComment, AuditLogItem, User, BrandBriefOpportunity, BrandClientProfile } from '../types';

/**
 * Centrally managed photo assets of adult creative professionals.
 * Stored centrally so photography references can be easily replaced or updated.
 */
export const CREATOR_PHOTOS = {
  alexMorgan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHNufZ3mqCcsM7Ah8va9lcIi7hlnu04a1mP6xjuy95jE7TJayW6MHVh2oWhn3FC-Su1Gpk2b2sN5q0EZDrXSgCUhga1gKyMZ5B7W6g1YCQC9ErMl2RaRmCaGPR8JK5o7QeFYjxPpSCvAa9Cv3Kd8pPGH0EUpEivMI8rHQcyRPnv0fcFplpEACu4uTQyrnU-2lwbIRqCj2zxvMrR79mhmbtLoVxlLZ_fDX0zcKYItTOxImMLhR05qh6hw',
  elenaRostova: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP2lfu9UXNDq9tYAwayIEVhqtQclX6ONJod2d6dEaAXdJ34ZgFbZRVZTL9mCyoiGgnUO_EJeZX8EeCdb-o2g9lozzXC5x4Q_oFJeSI82onpvNrNBR-MALd9mVMaMMiCfH2na6K8JFUzuIw_nz7WWi-5WdUDxXL8IbTNi7v3xeK3Yr59WJIcQMZLNOnN1iv5hXcndeU6XvJN9oT2ekoHsnBBnE5rOIKo9s9kF_53w2Wx3gcSnNrVt496w',
  marcusChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1W2OTC-q8SVmbjDV0VYp6G3PC-ukilRkaZyDyPkNpZP2gURrHT7pxei1g3LE5f0_oTENa6LdLU9fsGEEhtdlHJiKEqDlldAz6gQUMEs9lTM6q-_IfdhIY5xfuaC3Ft7LWpTbKRthfmnvgY4mmhrlPtwljDe_96NvfmS-UIgqa7WPksLyMenAd49nbTRh3DvezRPRf6rfPGTI2WE1GZE4eUK59V6IPLpaDAFgLWC5NgAcvXIn8vBmD3Q',
  mayaLin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav2DMckAdIJh1K-tJbMHEk9VlM4qxybDvtbSxtbW6AyddBok2o5B1KhFhykysc1oOUDdjGDc3xcnWXJkBau70amoo44n3iiTatCQdLh8egMA19_59qaJcwHBRHEzNal-Wk-LcSheyZypDVl5jGlw9KUT0oG-uwpEKoDz3IdpsN_imqXYV6vpwPgekISZlSrq_k_QctPxrr9I8Ds90Wi1ZWDlvvW13v3SCCnLaOiBTFVZ-5_wzIdPWhw',
  davidKalu: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoOssEsWb62SoXGvocgOZVeGQx_knZjkwSYn9jeL7jHaRm50f1h4hcfdpW6sRyMzTHGJ2FZcE9yM6HHurw_USxS_ctnLT0fM_u6vklElb4P1ZqPoe9wLN3hCtrjmRRsIB6bQ-SPCbec9cW_P_Qz4Mzoh3mW8ztgFgEtctx1u4EfB6Iv-vedVKyL9GC0LN_4Q6pC4URVJG5prvfUCIsWOmgWUF9vKg0LCkqzNHuvt8S97VhCpMpIQMWCA',
  chloeDupont: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvfKMAXWVMkohnukYGRWbyAUxe5esawIg-a7izdG4GD7g2fCIn7oSfopvU072hgDEMvs_-ieIsbBfKE6lAowX9refZZhHl6ltFwuiebTGJc1Kk5KZJ6Lz8t_MvQnRdzCmofQVTZWw4H_aHLAVweP_Yk-TUTRxn7Kcdu_4uiM55b-ffCsrpqF55E2DAA7IGovtuU1C7tRMinVz0NbW8oE0L29rH8EPuhgxzzdfhL977Dqh0sHQ5EkqaSA',
  julianVane: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCij3obne7IFDqKMvCjv5EMv2GapQ5YogB2lUVQyXh7nHbQu-asu8YilXKGvNpcUyyzhIMquwDJCQpyXzCQb4xNiW9YszYK3_80XSb7ENN0BIl3zQqdHzNUZh_YDO9oSEQ09WHlPU67MDSPNLTTcUbQP94EqOONkWdUeVtkV-oksOLkhrjhJBTrAU-YIQOTYKndG5KopOWEDqNH8kmSviJ-W_cwVvKi8aP4tYKn9Loong4iUJctzK-mmw',
  priyaSharma: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4oQ5JHic4SY2M1c62G3YxdZYF8GRPd22UWfDMBOk5gNbalPsFTO4ZMMnQac0jM2d6HXPVSvHyZDDjdBTl2OOA-cK_aEywF61BM-xnSqnp0DJp8IluA03z4Wvo36fzw_v05xrIkk63RhZp293YJAuytN2BXQSK5L8FUNqc2MPAzuXixnizYwzFP7S9SjmxFySDNVtNpqJdZoRwhCnc1OdiWTzQ63x1IUFgBHlrgZmz3rRs51_uqV0Cvg',
  davidVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qncopisa7mFRrDStFxVrqtIzvV6l6JY_m5nkaTCwYGyzQrNiTwKsty2qwuQX_54gtHdwrnDXngU3aTGiumhfCeyrTZhiqRyRHGOuLhnoXis-3_nT41mgJTw81_-EJYPyTYi8LOnpaVEpppnuPE37iqHYgWbooX2gOU3MhP7RKIpe9gImz9wcfTTGYQRcIrrnArgrrNkF2vMOMnD2iAfDaN2eEOHV0lVdudWWRPkvPzbp4XY-yA-abA',
  sarahJennings: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav2DMckAdIJh1K-tJbMHEk9VlM4qxybDvtbSxtbW6AyddBok2o5B1KhFhykysc1oOUDdjGDc3xcnWXJkBau70amoo44n3iiTatCQdLh8egMA19_59qaJcwHBRHEzNal-Wk-LcSheyZypDVl5jGlw9KUT0oG-uwpEKoDz3IdpsN_imqXYV6vpwPgekISZlSrq_k_QctPxrr9I8Ds90Wi1ZWDlvvW13v3SCCnLaOiBTFVZ-5_wzIdPWhw'
};

export const DEMO_USERS: Record<string, User> = {
  brand: {
    id: 'user-brand-1',
    name: 'David Vance',
    email: 'david.vance@auramotors.com',
    role: 'brand',
    title: 'Brand Creative Director',
    company: 'Aura Automotive Studios',
    avatar: CREATOR_PHOTOS.davidVance,
    badge: 'Sample Brand Client'
  },
  creator: {
    id: 'user-creator-1',
    name: 'Alex Morgan',
    email: 'alex@alexmorganfilm.com',
    role: 'creator',
    title: 'AI Filmmaker & Commercial Director',
    company: 'Morgan Studio Labs',
    avatar: CREATOR_PHOTOS.alexMorgan,
    badge: 'Sample Creator Profile'
  },
  admin: {
    id: 'user-admin-1',
    name: 'Sarah Jennings',
    email: 'sarah.jennings@creatorbridge.ai',
    role: 'admin',
    title: 'Quality & Compliance Reviewer',
    company: 'CreatorBridge Safety Labs (Demo)',
    avatar: CREATOR_PHOTOS.sarahJennings,
    badge: 'Sample Platform Reviewer'
  }
};

export const CREATORS: Creator[] = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    avatar: CREATOR_PHOTOS.alexMorgan,
    avatarAlt: 'Portrait photo of Alex Morgan, senior commercial director in modern creative studio',
    avatarFallback: 'AM',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'AI Filmmaking',
    roleDescription: 'AI Filmmaker & Commercial VFX Director',
    rating: 4.98,
    reviewCount: 38,
    turnaroundDays: '4–6 Days',
    indicativeRate: 1200,
    rateUnit: 'per project',
    location: 'Los Angeles, CA • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Runway Gen-3 Alpha', 'Midjourney v6', 'DaVinci Resolve Studio', 'OpenAI Sora Sandbox', 'Topaz Video AI'],
    workflowDescription: 'Multi-pass camera blocking via Gen-3 Alpha, optical flow interpolation, followed by full 32-bit color space mastering in DaVinci Resolve.',
    featuredProjectTitle: 'Luxe Obsidian Perfume Commercial',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBKXuCX0AvDzXjO4PBpiQzrAyLIwraSXEd7Z-HyjX3p95x9kWsRWOYmXvUQrUegfvGVKJ4-KQkVe75ns-HpDlAv2R1Um42rH4K4wzIsPyY7zqdX-y-ejJDa4S1QPbMcfG_i-kHkbS82EaQ1EoRTIkxzX82xFRNFflvSh9OGGUJm1Ip0ccR_oOvoZ5tNuBoNBueEAXyN49jfZ_ORgAg1SDQkao_w5ugNP_R70Lnco6tFN8MfBTWdC35jA',
    featuredProjectFormat: '4K ProRes',
    mediaAlt: 'A dramatic cinematic close up shot from a luxury perfume commercial with obsidian glass flacon, liquid gold swirls, volumetric lighting, and deep reflections.',
    bio: 'Experienced colorist and VFX supervisor transitioning into generative video workflows. Combines ControlNet depth maps with post-production color mastering in DaVinci Resolve Studio to maintain temporal coherence and aesthetic standards across commercial sequences.',
    yearsExperience: 8,
    commercialsDelivered: 42,
    primaryRig: 'Dual RTX 4090 48GB VRAM Studio Workstation',
    coloristCertified: 'DaVinci Certified Colorist',
    matchScore: 98,
    matchReasons: {
      relevance: 'Demonstrated experience in automotive launch cinematography & reflective surfacing.',
      toolCompatibility: 'Direct match on Runway Gen-3 Alpha + DaVinci Resolve color pipelines.',
      consistency: 'Published workflow utilizing ControlNet depth maps to maintain vehicle silhouette accuracy.',
      commercialSuitability: 'Commercial-use information provided by creator for client review.'
    },
    portfolio: [
      {
        id: 'aura-noctis',
        title: 'Aura Noctis — Luxury Fragrance AI Commercial',
        tag: 'AI Product Spot',
        category: 'commercials',
        duration: '30s Spot',
        resolution: '4K ProRes 422',
        verifiedStatus: '[Creator-Provided Sample]',
        tools: ['Runway Gen-3 Alpha', 'Midjourney v6', 'DaVinci Resolve'],
        description: 'Luxury launch spot concept for a boutique perfumery. Crafted through multi-pass fluid synthesis, custom glass caustics, and tight camera movements.',
        workflow: 'Text-to-image concept frames in Midjourney v6 → Image-to-video camera control passes in Runway Gen-3 → Optical flow interpolation in DaVinci.',
        generativePercentage: 60,
        humanPercentage: 40,
        humanLabel: 'Human Grading & Polish',
        format: '16:9 4K UHD ProRes 422 & 9:16 Social Cut',
        licensing: 'Commercial Buyout (Creator-Provided Terms)',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmnKLwN-97XTpITiJaPudCDN450g0KGd7E1oGBXFzOM8lwmLWO6OYtWBYbmJxpaW8IL50Ho-xf0WDAMVpxjSPNzspHZ2imovb3MqGapBzhcPcUw-GPf1w8cGLHP5245YopnqSrGHAgxu6QIakN6mqK7Ejzo2f0xog8FAzeIXzKXpLiyaH204FugEAbSeQ4GAjUzVmM2iXhcVe4xY7UGc_wUOaqV9VGzZROh3pQ-cWwYxuH6ekc481PLQ',
        altText: 'Cinematic 4K still frame of bespoke luxury black obsidian perfume bottle named Aura Noctis with golden fluid dynamics',
        seedAudited: false
      },
      {
        id: 'apex-velocity',
        title: 'Apex Velocity — Cyberpunk Sneaker Spot',
        tag: 'Footwear Promo',
        category: 'commercials',
        duration: '15s Reel',
        resolution: '9:16 Vertical 60fps',
        verifiedStatus: '[Creator-Provided Sample]',
        tools: ['ComfyUI Custom LoRA', 'ControlNet Depth', 'Cinema4D'],
        description: 'Dynamic footwear concept reveal. ControlNet depth passes guided by a raw 3D mesh model help maintain silhouette consistency.',
        workflow: '3D model pass for shoe geometry → Custom LoRA texture transfer in ComfyUI → Depth-map conditioned camera moves → After Effects polish.',
        generativePercentage: 50,
        humanPercentage: 50,
        humanLabel: '3D CAD & Human VFX',
        format: '9:16 Vertical 60fps & 1:1 Square',
        licensing: 'Commercial Digital Distribution',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmgpNzsJ1B6cTQde83KtYypd6FX6h4RbcuHGf_SwaOgi81P-kcnj8fAgdBL6bCofJviGjZwH7LeerMondC6-hPC1S96JQ0n37DyIFu_GhVt-qFFf9_R2kpxBrYD7OuFEFO8xEe0GWeN9Gpy7oYbpB-wYf9dT88JALc3Bd27o4D7q55pJU9xNLBhqsQH2EvKkaX0dhkXUZSAHb3ywLAgrDab7KgBkux5nITOAM_vOzMHh08iS_SqJxGOQ',
        altText: 'Cyberpunk sneaker spot preview, futuristic iridescent running shoe in neon reflections',
        seedAudited: false
      },
      {
        id: 'echoes-kepler',
        title: 'Echoes of Kepler-22b — Sci-Fi Teaser',
        tag: 'Narrative Cinema',
        category: 'narrative',
        duration: '90s Short Film Teaser',
        resolution: '2.39:1 CinemaScope 4K DCI',
        verifiedStatus: '[Creator-Provided Claim]',
        tools: ['OpenAI Sora Sandbox', 'ElevenLabs AI Voice', 'Premiere Pro'],
        description: 'Speculative fiction teaser exploring character continuity across consecutive dialogue cuts and environmental transitions.',
        workflow: 'Concept generation & prompt choreography in Sora → Voice synthesis via ElevenLabs → Premiere Pro assembly → Color grading.',
        generativePercentage: 75,
        humanPercentage: 25,
        humanLabel: 'Human Sound & Narrative',
        format: '2.39:1 CinemaScope 4K DCI',
        licensing: 'Film Festival & Showcase Rights',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRwypNkCXOKzs38n80QsoWh3DkJOGHaaHrPXmh07THO97I-L2pTJmsX2Yj1Dub9B8tSwfV-nUdYIzSWI9fKElj_voYAkwATfDo1DTV7rugbegpb-nkXY4oZzWPkh5YrGf75Fl6l5CbcFQwXroZ7R2u7IXtv07Vm5PwUpysgQ3OubSo_vd8RHb76h4nFca7BnTqfPmCE8MdEiRVhRush3bvTo7sGmH7ttLOoY4KTjfF0li1dBlPq1otPg',
        altText: 'Expansive sci-fi cinematic landscape on alien planet Kepler-22b with glowing flora and explorer in high-tech suit',
        seedAudited: false,
        festivalCredit: 'Screened at AI Film Fest 2024'
      },
      {
        id: 'aethelgard-spirits',
        title: 'Aethelgard Spirits — Photoreal Beverage Motion',
        tag: 'Beverage Commercial',
        category: 'vfx',
        duration: '20s TVC Spec',
        resolution: '16:9 Broadcast Master (4K 60fps)',
        verifiedStatus: '[Creator-Provided Sample]',
        tools: ['Luma Dream Machine', 'Topaz Video AI', 'Blender Physics'],
        description: 'High-speed liquid splash aesthetic generated with Luma motion engines followed by Topaz neural temporal upscaling.',
        workflow: 'Fluid volume generation in Luma Dream Machine → Blender camera tracking → Topaz Video AI frame interpolation → Final grade.',
        generativePercentage: 65,
        humanPercentage: 35,
        humanLabel: 'Neural Upscaling & Grade',
        format: '16:9 Master (4K 60fps)',
        licensing: 'Commercial Digital Broadcast',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCblDlRsprPu1s9MZ55czqDbJL86e9o2v9UCv6tpS-A8-20V3mtz2BH_URYUG6PsrX-D2Pg9fK1Lm7zdZq1URfd4zaWHt9JKGVnW3hSl1depC1MGUXB4KQyk0v9rsu8NbqikBrzqW0S718QoykuZHE3Ol70Qw2pNdrWUlZBeGvr8HPAC6A1it3BNqoYiN1Dz7HcuyYnhLP5F6Jz-Vk7eqXM7IR8j8ZpEs1tM73I7YcBurWs6kW9zJLg8A',
        altText: 'Macro photoreal slow-motion splash hitting crystal glass with ice sphere',
        seedAudited: false
      }
    ],
    packages: [
      {
        tier: 'Tier 1 • Quick Turnaround',
        name: 'Single Social Cut',
        subtitle: 'Suitable for social platforms or product tease shorts requiring rapid deployment.',
        price: 850,
        turnaround: '3–4 business days',
        deliverables: [
          '15-second finished spot (1080p FHD)',
          '9:16 or 1:1 aspect ratio',
          '2 revision rounds included',
          'Licensed sound bed + voiceover',
          'Commercial digital usage terms'
        ]
      },
      {
        tier: 'Tier 2 • Flagship Spot',
        name: 'Standard Commercial',
        subtitle: 'Cinematic spot for product launch, hero landing page, or paid advertising.',
        price: 1600,
        turnaround: '5–7 business days',
        popular: true,
        deliverables: [
          '30-second spot in 4K ProRes 422',
          'Dual Deliverables (16:9 + 9:16 cutdown)',
          'Sound design & audio mastering',
          '3 revision rounds included',
          'Commercial digital usage rights',
          'Prompt and seed log documentation'
        ]
      },
      {
        tier: 'Tier 3 • Full Suite',
        name: 'Complete Brand Campaign',
        subtitle: 'Omnichannel creative package with hero spot, cutdowns, and key visual stills.',
        price: 3200,
        turnaround: '8–10 business days',
        deliverables: [
          '30s Hero Spot + 2x 15s Cutdowns',
          '5x High-Resolution Key Visual Stills',
          'Custom model configuration documentation',
          'DaVinci Resolve project archive',
          '3 revision rounds included',
          'Direct collaboration channel'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian Vance',
        role: 'Creative Director',
        company: 'Maison & Mare',
        rating: 5,
        date: 'May 2025 • Sample Review',
        project: 'Luxury Fragrance AI Commercial',
        comment: 'Alex delivered our luxury fragrance launch video promptly. The DaVinci color grading and glass caustics gave the spot a high-end cinematic finish. Great communication throughout the milestone process.'
      },
      {
        id: 'rev-2',
        author: 'Sarah Lin',
        role: 'Marketing Lead',
        company: 'Kinetix Athletics',
        rating: 5,
        date: 'April 2025 • Sample Review',
        project: 'Cyberpunk Footwear Campaign',
        comment: 'The model calibration Alex configured kept our footwear silhouette consistent across angles. Turnaround was quick and the review process was straightforward.'
      },
      {
        id: 'rev-3',
        author: 'Marc DuPont',
        role: 'Executive Producer',
        company: 'Neon Horizon',
        rating: 5,
        date: 'April 2025 • Sample Review',
        project: 'Broadcast Spirits TVC',
        comment: 'Alex provided clear documentation of model seeds and parameters. Milestone approvals were smooth and the final 4K deliverables met our broadcast requirements.'
      }
    ]
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    avatar: CREATOR_PHOTOS.elenaRostova,
    avatarAlt: 'Portrait photograph of Elena Rostova, a 3D digital artist with subtle studio lighting',
    avatarFallback: 'ER',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'Product Advertising',
    roleDescription: 'AI Product Ads & 3D Motion Specialist',
    rating: 4.95,
    reviewCount: 26,
    turnaroundDays: '3 Days',
    indicativeRate: 850,
    rateUnit: 'per project',
    location: 'Berlin, Germany • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['ComfyUI', 'ControlNet', 'Cinema4D', 'Octane Render', 'SDXL Custom'],
    workflowDescription: 'Geometry conditioning via ControlNet depth maps combined with 3D lighting rigs for sharp consumer product campaigns.',
    featuredProjectTitle: 'ZeroGravity Sneaker Ad',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARV8WQH2iu1ffmrVDXMmjnUPYnabscdKZiBfrbPglvDs6Ih8WFL7bjoPvE32H_NsWunK0e0bce5Om3XrT3wimDT6mj8Xm4lodyfC4b3XNos3iz6q7M9kFJLdL3OfG5CHP0Vtz_UEizMV_l8qWNuQqJACflhVd3pRG9oUJ1T1oRBhB0EerA37LSsJZUHJ0YI3jP-sfVPD2_Fk_S9gASELL2AiSfhUZDe1_HSbv4reQ184cwDMS0LjllyQ',
    featuredProjectFormat: '3D Asset + Video',
    mediaAlt: 'Futuristic glowing running sneaker levitating in zero gravity surrounded by holographic particles and dynamic neon light trails',
    matchScore: 94,
    matchReasons: {
      relevance: 'Demonstrated experience in ComfyUI multi-control conditioning and photoreal specular lighting.',
      toolCompatibility: 'ComfyUI node-based pipelines paired with Cinema4D 3D assets.',
      consistency: 'ControlNet depth anchoring helps maintain geometry across camera moves.',
      commercialSuitability: 'Commercial use parameters specified by creator for client review.'
    }
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    avatar: CREATOR_PHOTOS.marcusChen,
    avatarAlt: 'Headshot portrait of Marcus Chen, an Unreal Engine technical artist with glasses',
    avatarFallback: 'MC',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: '3D & Neural NeRF/Gaussian',
    roleDescription: 'Worldbuilder & 3D Environment Director',
    rating: 5.0,
    reviewCount: 42,
    turnaroundDays: '5 Days',
    indicativeRate: 1600,
    rateUnit: 'per project',
    location: 'Vancouver, BC • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Unreal Engine 5', '3D Gaussian Splatting', 'Midjourney v6', 'Kaedim 3D', 'Luma NeRF'],
    workflowDescription: 'Bridges 2D generative diffusion models with real-time Lumen lighting and Nanite geometry for pitch sequences.',
    featuredProjectTitle: 'Metropolis 2088 Cinematics',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPKEQCdZG3qsvOKE5fJ-JUUfXV0u_Mjfx9kCYfvnS3tG4TtYl0tb7fVvEVd8pC31JMFGPhSqup-1qv9xZ7skLHshnnUOdQ-kOORjC0gT_2F0oH1KHBABBnOWP7EfsmEOs7LPXV22T6T0R8nBnG1lpvwYtS54akKLMqqjh6S4l1LOJBFcgicaLmxvyKVlG4Z3NosX3jy_vcX5pacirfMeUMN7Z27Z30WyE0eR-QuLOCLbSeu81nHI8xcg',
    featuredProjectFormat: 'Gaussian Splat',
    mediaAlt: 'Futuristic sci-fi city sprawl at twilight with towering architecture and flying transit lines',
    matchScore: 91,
    matchReasons: {
      relevance: 'Unreal Engine 5 + Gaussian splatting provides spatial depth lock for dynamic driving scenes.',
      toolCompatibility: 'Real-time UE5 pipeline provides direct camera pathing.',
      consistency: 'Geometric environments reduce morphing across dynamic turns.',
      commercialSuitability: 'Sample commercial project history available for review.'
    }
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    avatar: CREATOR_PHOTOS.mayaLin,
    avatarAlt: 'Portrait of Maya Lin, fashion art director in creative studio setting',
    avatarFallback: 'ML',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'Generative Art & Stills',
    roleDescription: 'AI Fashion & Editorial Art Director',
    rating: 4.92,
    reviewCount: 19,
    turnaroundDays: '2 Days',
    indicativeRate: 600,
    rateUnit: 'per project',
    location: 'London, UK • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Midjourney v6', 'Photoshop Firefly', 'Topaz Gigapixel', 'Magnific AI', 'Flux.1 Pro'],
    workflowDescription: 'Curates and refines high-fashion key visuals with neural upscaling passes for digital editorial campaigns.',
    featuredProjectTitle: 'Neo-Silk Haute Couture',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9t1ct7FYzd2fGyYtoGdyEV4km937GJpkqpjdb9hYArMCLY16LixylRs4bbSUsLpUCSkaQSJgQS2gyLsMRgA4miM0Zs-LjaWGncAf_YHudIH1u5KNKzFFVrJ0UtV3EBdkJFLd8hizeTMvhULwMXbcapMCqkdAVk-UEk6KmfppiaDpTAsoB1973wH44x10uBsw704mmR3_3xkUMVQnwAmC2KYfsDGWp0EVFs-sBywiCOqNXre_6FPiwRg',
    featuredProjectFormat: '8K Stills',
    mediaAlt: 'High fashion editorial portrait of a model draped in intricate metallic organza fabric, studio lighting',
    matchScore: 84
  },
  {
    id: 'david-kalu',
    name: 'David Kalu',
    avatar: CREATOR_PHOTOS.davidKalu,
    avatarAlt: 'Headshot photo of David Kalu, creative technologist with headphones in creative studio',
    avatarFallback: 'DK',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'AI Animation',
    roleDescription: 'AI Character Animator & Motion Director',
    rating: 4.89,
    reviewCount: 31,
    turnaroundDays: '6 Days',
    indicativeRate: 1400,
    rateUnit: 'per project',
    location: 'Lagos • Remote Global',
    availability: 'Limited Spots',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Kling AI 1.5', 'Stable Video Diffusion', 'After Effects', 'Deforum', 'EbSynth'],
    workflowDescription: 'Specialized in temporal consistency across generative keyframes, rhythm beat-matching, and motion-tracked visual effects.',
    featuredProjectTitle: 'Synthwave Beats Odyssey',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4aLdS_nZ2SL6JxawI5X2qvuywV6io4ofWX6DmmAi4sJFDK6e0Saq2pPn3dKNET6s5hQkZE8ZO9FrWI3lF7ikO6aZzDMYFCecUpMgaILdYtcbr7h9m_E-WIu4ItGfabd03YAYNOER233lM353tWe1NGJ3ZTZRBms2lJwAuqNaKMFdC7DcMYLMcW6TrDRECB6iUiMQz8M9mJJ7y5dZfK1OxhMdb77APJ99snRFUBjrORwIfkEdR6E0lg',
    featuredProjectFormat: 'Music Video',
    mediaAlt: 'Retro-futuristic synthwave animated music video frame with neon purple landscape, sports car racing beneath sun',
    matchScore: 82
  },
  {
    id: 'chloe-dupont',
    name: 'Chloe Dupont',
    avatar: CREATOR_PHOTOS.chloeDupont,
    avatarAlt: 'Portrait of Chloe Dupont, campaign art director in Parisian creative studio',
    avatarFallback: 'CD',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'Product Advertising',
    roleDescription: 'Brand Advertising & Social Motion Lead',
    rating: 4.97,
    reviewCount: 53,
    turnaroundDays: '3 Days',
    indicativeRate: 750,
    rateUnit: 'per project',
    location: 'Paris, France • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Runway Gen-3', 'Pika 2.0', 'Canva Enterprise AI', 'CapCut Pro', 'Midjourney v6'],
    workflowDescription: 'Rapid 9:16 vertical motion assets designed for performance marketing and social video campaigns.',
    featuredProjectTitle: 'Glow Skincare Dynamic Ads',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrPKB5iJ-i59Olg9EfeS3qgnaTA0LzLv8JbspCX2UdlsluQmnorgWjEDPtK8LztssdpojoeBqVjBP-f0GsX2jD_MsJkRcpguVxHqYILjCJJZ8Ae7onG63Xsb9dWziBPdOxgnBNWE2xCy9jTni1pTf3jLDDhAykhBHZHibcd1Zhv17Zn-oKq0GkI3mdI5YgeSrUJq51w_9wB0iekGFdI9hSkYRg5qGaXygAl9_IY7sWof6IDa-p9pYJRg',
    featuredProjectFormat: '9:16 Social',
    mediaAlt: 'Clean skincare visual featuring organic water droplets splashing against frosted glass serum bottle',
    matchScore: 80
  },
  {
    id: 'julian-vane',
    name: 'Julian Vane',
    avatar: CREATOR_PHOTOS.julianVane,
    avatarAlt: 'Portrait photo of Julian Vane, senior visual effects concept artist',
    avatarFallback: 'JV',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'Generative Art & Stills',
    roleDescription: 'AI Sci-Fi VFX & Concept Artist',
    rating: 4.94,
    reviewCount: 22,
    turnaroundDays: '4 Days',
    indicativeRate: 1100,
    rateUnit: 'per project',
    location: 'London, UK • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['SDXL Custom LoRA', 'Blender Cycles', 'ComfyUI', 'Midjourney v6', 'Nuke VFX'],
    workflowDescription: 'Trains custom model checkpoints on client-provided architectural references to support design fidelity.',
    featuredProjectTitle: 'Interstellar Orbital Colony',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClqgpkpgTJyIyIKDi-g-C64LzZpN7IOirM4F4Ny7D9ij-eHQ9MoxVzQHH7j3qaR0QYUNEaJ9N_C9t0W2VFIBsyHB2YXUktKwpMMgpF77DhYAtk7W3a7GsP1gBIcMXSi89wwkVzYzcqmlXAI6vQ9s637Wm9ad51A1MbpOFJMqPUCk4qwfTr1IqV9JXZX7oPF9mvlTprJBLLy2wa2TWPfqupT9e7v38JnzJ6SMfCCvhVDCv34PrpFkovgw',
    featuredProjectFormat: 'VFX Concept',
    mediaAlt: 'Rotating space station orbiting a blue gas giant planet with intricate mechanical details',
    matchScore: 86,
    matchReasons: {
      relevance: 'Cinematic aesthetic alignment for atmospheric lighting and vehicle staging.',
      toolCompatibility: 'SDXL custom weights workflow fits complex architectural prompts.',
      consistency: 'Utilizes 3D mock passes for camera angle repeatability.',
      commercialSuitability: 'Creator-provided commercial usage declaration provided for review.'
    }
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    avatar: CREATOR_PHOTOS.priyaSharma,
    avatarAlt: 'Portrait photo of Priya Sharma, brand identity designer in a sunlit studio',
    avatarFallback: 'PS',
    isSampleProfile: true,
    demoNotice: 'Sample Creator Profile • Demonstration Data',
    specialization: 'Brand Design & Packaging',
    roleDescription: 'Generative Typography & Packaging Lead',
    rating: 4.99,
    reviewCount: 47,
    turnaroundDays: '2 Days',
    indicativeRate: 550,
    rateUnit: 'per project',
    location: 'Stockholm, Sweden • Remote Global',
    availability: 'Available Now',
    verifiedTier: 'Creator-Declared Workflow',
    tools: ['Vectorizer AI', 'Illustrator AI', 'Midjourney', 'Photoshop Gen Fill', 'FontForge AI'],
    workflowDescription: 'Translates neural concepts into clean, scalable vector assets prepared for print and packaging production.',
    featuredProjectTitle: 'Kombucha Botanical Identity',
    featuredProjectTag: 'Sample Case Study',
    featuredProjectMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFnS0cQ8CnqT_vxa6qvGZ9PXbHd_8443jYjMuG7VvowXzR3v2BbSSkb3FxiyO--GQhTwZ6drcw0BNCzhYppaL9FunxjWIuqpz2NRYXenjXsnMUHUUdsjlXhN1z84N-NgkzEcIw6JvBMl5FIXEnzkCrHgoD2igIcLnRsCYKSXERAzEb2xCuzZcXw1cg__3oVSqnzV_k5WQeBYReNKzlrdiQXNlXrp1f_O70zqf8p7A3fdpMxjO8cxWoig',
    featuredProjectFormat: 'Vector Brand',
    mediaAlt: 'Generative botanical typography packaging design for artisan kombucha beverage with embossed gold foil details',
    matchScore: 78
  }
];

export const ACTIVE_BRIEF: ProjectBrief = {
  id: 'BRIEF-88219',
  title: 'Luminary High-Performance Electric Hypercar Launch',
  brand: 'Aura Automotive Corp.',
  agency: 'Aura Automotive Studios (Agency)',
  objective: 'Brand Awareness & Digital Product Launch Campaign',
  targetAudience: 'Tech enthusiasts and premium electric vehicle buyers aged 28-55',
  description: 'Create a 30-second hyper-cinematic teaser commercial showcasing the aerodynamic curves of our new concept vehicle driving through an atmospheric neon-lit landscape.',
  contentType: 'AI Commercial Film & 3D Motion',
  visualStyle: 'Cinematic photorealism, atmospheric anamorphic lighting, Blade Runner 2049 aesthetic palette',
  deliverables: [
    '1x 30s Master (16:9)',
    '2x 15s Cutdowns (9:16)',
    '4x High-Resolution Key Art Stills'
  ],
  format: '4K UHD (3840x2160) ProRes 422 HQ',
  aspectRatio: '16:9 Landscape (with 9:16 vertical cuts)',
  preferredTools: [
    'Runway Gen-3 Alpha',
    'Midjourney v6.1',
    'ComfyUI / ControlNet',
    'DaVinci Resolve Studio'
  ],
  modelWorkflow: 'Model pipeline should support depth-map conditioning or ControlNet to maintain vehicle silhouette accuracy across high-speed dynamic camera angles.',
  specialization: 'AI Filmmaking',
  humanStandards: 'Color grading polish, seamless audio synchronization, upscale denoising, and consistent vehicle lines across shots.',
  restrictions: 'Commercial suitability required. No unlicensed checkpoints or unconsented likenesses.',
  budgetMin: 2000,
  budgetMax: 3500,
  deliveryDate: 'Oct 28, 2025',
  revisions: '2 Rounds included in project scope',
  commercialRights: 'Full Commercial Buyout (Global Digital Distribution)',
  commercialRequirements: 'All final video assets must include cleared commercial-use documentation provided by creator.',
  referenceLinks: 'https://example.com/luminary-concept-moodboard',
  sampleNotes: 'Color palette reference: Midnight Obsidian #0a0a14 with Cyber Blue #00e5ff accents.'
};

export const CURRENT_ACTIVE_BRIEF = ACTIVE_BRIEF;

export const INITIAL_WORKSPACE_COMMENTS: TimecodedComment[] = [
  {
    id: 'tc-1',
    authorName: 'Alex Morgan',
    authorRole: 'Creator (Demo)',
    avatarText: 'AM',
    avatarBg: 'bg-[#175cb5] text-white',
    timestampText: '10:48 AM',
    message: 'Hey David! Uploaded animatic v2 for your review. I calibrated our ControlNet depth pass with the CAD references of the concept so the hood curves remain consistent across camera pan angles.',
    attachment: 'Luminary_Hypercar_Animatic_v2.mp4',
    isCreator: true
  },
  {
    id: 'tc-2',
    authorName: 'David Vance',
    authorRole: 'Brand Director (Demo)',
    avatarText: 'DV',
    avatarBg: 'bg-[#14243a] text-white',
    timecode: '0:14',
    timestampText: '11:15 AM',
    message: 'Looking great, Alex! At timestamp 0:14, let\'s make sure the neon reflection in the windshield doesn\'t obscure the driver cockpit. Can we dial down the specular reflection in that specific pass?'
  },
  {
    id: 'tc-3',
    authorName: 'Alex Morgan',
    authorRole: 'Creator (Demo)',
    avatarText: 'AM',
    avatarBg: 'bg-[#175cb5] text-white',
    timestampText: '11:22 AM',
    message: 'Understood! I will mask the windshield region using a depth matte and reduce the reflection gain for that segment. I will push an updated draft shortly.',
    isCreator: true
  }
];

export const AUDIT_TIMELINE: AuditLogItem[] = [
  {
    id: 'audit-1',
    title: 'Sample Deliverable Uploaded',
    description: 'Alex Morgan uploaded Luminary_Hypercar_Animatic_v2.mp4 (4K Proxy with ControlNet depth pass).',
    timestamp: 'Today at 10:45 AM',
    type: 'version'
  },
  {
    id: 'audit-2',
    title: 'Milestone 1 Simulated Approval',
    description: 'Brand reviewed initial prompt sheets. Milestone 1 funds released to creator in prototype simulation.',
    timestamp: 'Yesterday at 3:30 PM',
    type: 'escrow'
  },
  {
    id: 'audit-3',
    title: 'Commercial Checklist Recorded',
    description: 'Creator submitted commercial toolchain declaration and seed log documentation for review.',
    timestamp: '3 days ago',
    type: 'indemnity'
  },
  {
    id: 'audit-4',
    title: 'Prototype Milestone Setup',
    description: 'Simulated contract initialized with 3 staged project milestones.',
    timestamp: '5 days ago',
    type: 'init'
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'ai-filmmaking',
    name: 'AI Filmmaking',
    description: 'Cinematic generative video, shot sequencing, temporal coherence & narrative pacing.',
    creatorCount: 142,
    icon: 'movie',
    tools: ['Sora', 'Runway Gen-3', 'Luma Dream Machine']
  },
  {
    id: 'ai-animation',
    name: 'AI Animation & Motion',
    description: 'Dynamic animation, 2.5D visual effects, stylized keyframing and motion loops.',
    creatorCount: 98,
    icon: 'animation',
    tools: ['Stable Video', 'AnimateDiff', 'Kling AI']
  },
  {
    id: 'generative-art',
    name: 'Generative Art & Stills',
    description: 'High-resolution creative key visuals, lookbooks, concept art, and print hero imagery.',
    creatorCount: 215,
    icon: 'palette',
    tools: ['Midjourney v6', 'SDXL Custom', 'Flux.1 Pro']
  },
  {
    id: 'product-ads',
    name: 'Product Advertising',
    description: 'E-commerce product visuals, photoreal composite staging, and brand-accurate geometry.',
    creatorCount: 176,
    icon: 'shopping_bag',
    tools: ['ComfyUI LoRA', 'ControlNet', 'Cinema4D']
  },
  {
    id: '3d-motion',
    name: '3D & Neural NeRF/Gaussian',
    description: 'Neural radiance fields (NeRFs), 3D Gaussian splat environments, and camera pathing.',
    creatorCount: 84,
    icon: 'view_in_ar',
    tools: ['Gaussian Splat', 'Unreal Engine 5', 'Kaedim 3D']
  },
  {
    id: 'brand-identity',
    name: 'Brand Design & Packaging',
    description: 'Vector-ready assets, packaging typography, generative layout systems.',
    creatorCount: 120,
    icon: 'draw',
    tools: ['Vectorizer AI', 'Illustrator AI', 'Midjourney']
  },
  {
    id: 'audio-synthesis',
    name: 'Audio & Voice Synthesis',
    description: 'Voiceover localization, bespoke generative background score, sound effects styling.',
    creatorCount: 65,
    icon: 'headphones',
    tools: ['ElevenLabs', 'Udio', 'Suno AI']
  },
  {
    id: 'virtual-avatars',
    name: 'Virtual Spokespersons & Avatars',
    description: 'Consistent facial likeness, multi-lingual lip-sync presentation video.',
    creatorCount: 52,
    icon: 'face',
    tools: ['HeyGen', 'D-ID', 'FaceID LoRA']
  }
];

export const BRAND_OPPORTUNITIES: BrandBriefOpportunity[] = [
  {
    id: 'opp-aura-1',
    title: 'Luminary Hypercar Global Commercial Teaser (30s Spot)',
    brandName: 'Aura Automotive Corp.',
    brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qncopisa7mFRrDStFxVrqtIzvV6l6JY_m5nkaTCwYGyzQrNiTwKsty2qwuQX_54gtHdwrnDXngU3aTGiumhfCeyrTZhiqRyRHGOuLhnoXis-3_nT41mgJTw81_-EJYPyTYi8LOnpaVEpppnuPE37iqHYgWbooX2gOU3MhP7RKIpe9gImz9wcfTTGYQRcIrrnArgrrNkF2vMOMnD2iAfDaN2eEOHV0lVdudWWRPkvPzbp4XY-yA-abA',
    industry: 'Automotive & Mobility',
    budget: 18500,
    escrowStatus: 'Escrow Vault Funded',
    duration: '30s Master + 2x 15s Cutdowns',
    turnaroundDays: '5 Days',
    deadline: 'In 3 Days',
    requiredTools: ['Runway Gen-3 Alpha', 'ControlNet Depth', 'DaVinci Resolve Studio'],
    deliverables: ['4K ProRes 422 HQ Master', 'Depth Pass Matte Video', 'Key Art Frame Stills', 'Cryptographic Seed Log'],
    objective: 'Showcase aerodynamic carbon fiber surfacing & dynamic neon wet-pavement reflections with zero vehicle morphing.',
    description: 'Aura Motors is launching the 2026 Luminary Hypercar. We require a verified generative AI filmmaker who can deliver an anamorphic night-drive sequence with strict design continuity and certified commercial IP indemnity.',
    visualStyle: 'Photoreal cinematic 35mm, Blade Runner 2049 neon palette, atmospheric volumetrics',
    commercialIndemnityRequired: true,
    proposalsCount: 6,
    hiringManager: {
      name: 'David Vance',
      role: 'Brand Creative Director',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qncopisa7mFRrDStFxVrqtIzvV6l6JY_m5nkaTCwYGyzQrNiTwKsty2qwuQX_54gtHdwrnDXngU3aTGiumhfCeyrTZhiqRyRHGOuLhnoXis-3_nT41mgJTw81_-EJYPyTYi8LOnpaVEpppnuPE37iqHYgWbooX2gOU3MhP7RKIpe9gImz9wcfTTGYQRcIrrnArgrrNkF2vMOMnD2iAfDaN2eEOHV0lVdudWWRPkvPzbp4XY-yA-abA'
    }
  },
  {
    id: 'opp-vogue-2',
    title: 'Paris Haute Couture Digital Runway & Liquid Silk Film (45s)',
    brandName: 'Maison Éthéré / Vogue Digital',
    brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP2lfu9UXNDq9tYAwayIEVhqtQclX6ONJod2d6dEaAXdJ34ZgFbZRVZTL9mCyoiGgnUO_EJeZX8EeCdb-o2g9lozzXC5x4Q_oFJeSI82onpvNrNBR-MALd9mVMaMMiCfH2na6K8JFUzuIw_nz7WWi-5WdUDxXL8IbTNi7v3xeK3Yr59WJIcQMZLNOnN1iv5hXcndeU6XvJN9oT2ekoHsnBBnE5rOIKo9s9kF_53w2Wx3gcSnNrVt496w',
    industry: 'Luxury & Haute Couture',
    budget: 14000,
    escrowStatus: 'Escrow Vault Funded',
    duration: '45s Conceptual Film',
    turnaroundDays: '4 Days',
    deadline: 'In 5 Days',
    requiredTools: ['Midjourney v6.1', 'ComfyUI Custom LoRA', 'After Effects'],
    deliverables: ['4K Digital Master', 'Social Vertical 9:16 Cut', '6x Lookbook Stills'],
    objective: 'Generate hyper-surreal fluid textiles that bloom into architectural couture on digital avatars.',
    description: 'Looking for a specialized generative fashion director. Must demonstrate consistent fabric physics, bespoke model training on luxury textures, and clean rights.',
    visualStyle: 'Surrealist minimalism, warm studio rim-lighting, organic iridescent fluid dynamics',
    commercialIndemnityRequired: true,
    proposalsCount: 4,
    hiringManager: {
      name: 'Camille Laurent',
      role: 'Head of Digital Artistry',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvfKMAXWVMkohnukYGRWbyAUxe5esawIg-a7izdG4GD7g2fCIn7oSfopvU072hgDEMvs_-ieIsbBfKE6lAowX9refZZhHl6ltFwuiebTGJc1Kk5KZJ6Lz8t_MvQnRdzCmofQVTZWw4H_aHLAVweP_Yk-TUTRxn7Kcdu_4uiM55b-ffCsrpqF55E2DAA7IGovtuU1C7tRMinVz0NbW8oE0L29rH8EPuhgxzzdfhL977Dqh0sHQ5EkqaSA'
    }
  },
  {
    id: 'opp-zenith-3',
    title: 'Quantum Chronograph Tourbillon Macro Animation (15s)',
    brandName: 'Zenith Horology Lab',
    brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1W2OTC-q8SVmbjDV0VYp6G3PC-ukilRkaZyDyPkNpZP2gURrHT7pxei1g3LE5f0_oTENa6LdLU9fsGEEhtdlHJiKEqDlldAz6gQUMEs9lTM6q-_IfdhIY5xfuaC3Ft7LWpTbKRthfmnvgY4mmhrlPtwljDe_96NvfmS-UIgqa7WPksLyMenAd49nbTRh3DvezRPRf6rfPGTI2WE1GZE4eUK59V6IPLpaDAFgLWC5NgAcvXIn8vBmD3Q',
    industry: 'Swiss Luxury Timepieces',
    budget: 9500,
    escrowStatus: 'Escrow Ready',
    duration: '15s High-Impact Macro',
    turnaroundDays: '3 Days',
    deadline: 'In 2 Days',
    requiredTools: ['Blender Cycles', 'Flux.1 Pro', 'Kaedim 3D', 'Topaz Video AI'],
    deliverables: ['4K UHD Uncompressed ProRes', 'Alpha Channel Watch Float', 'Loopable 1:1 Social Cut'],
    objective: 'Ultra-close macro shots of watch movement gear teeth rotating in zero gravity with sapphire crystal caustics.',
    description: 'Swiss horology brand seeking 3D/generative animator to produce micro-mechanical visual sequences for our limited edition timepiece debut.',
    visualStyle: 'Metallic precision, deep obsidian shadows, crisp gold & titanium specular reflections',
    commercialIndemnityRequired: true,
    proposalsCount: 8,
    hiringManager: {
      name: 'Henrik Visser',
      role: 'VP Brand Communications',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoOssEsWb62SoXGvocgOZVeGQx_knZjkwSYn9jeL7jHaRm50f1h4hcfdpW6sRyMzTHGJ2FZcE9yM6HHurw_USxS_ctnLT0fM_u6vklElb4P1ZqPoe9wLN3hCtrjmRRsIB6bQ-SPCbec9cW_P_Qz4Mzoh3mW8ztgFgEtctx1u4EfB6Iv-vedVKyL9GC0LN_4Q6pC4URVJG5prvfUCIsWOmgWUF9vKg0LCkqzNHuvt8S97VhCpMpIQMWCA'
    }
  },
  {
    id: 'opp-apex-4',
    title: 'Neon District — AAA Cyberpunk Worldbuilding Trailer (60s)',
    brandName: 'Apex Interactive Games',
    brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClqgpkpgTJyIyIKDi-g-C64LzZpN7IOirM4F4Ny7D9ij-eHQ9MoxVzQHH7j3qaR0QYUNEaJ9N_C9t0W2VFIBsyHB2YXUktKwpMMgpF77DhYAtk7W3a7GsP1gBIcMXSi89wwkVzYzcqmlXAI6vQ9s637Wm9ad51A1MbpOFJMqPUCk4qwfTr1IqV9JXZX7oPF9mvlTprJBLLy2wa2TWPfqupT9e7v38JnzJ6SMfCCvhVDCv34PrpFkovgw',
    industry: 'Gaming & Virtual Production',
    budget: 24000,
    escrowStatus: 'Escrow Vault Funded',
    duration: '60s Cinematic Story Trailer',
    turnaroundDays: '7 Days',
    deadline: 'In 6 Days',
    requiredTools: ['Kling 1.5 Pro', 'Unreal Engine 5 NeRF', 'ControlNet Depth', 'DaVinci Resolve'],
    deliverables: ['4K Cinema Trailer', '3x Character Teasers', 'Environment Flythrough Stills'],
    objective: 'Establish believable dystopian cityscape with flying transit, hologram billboards, and persistent character identity.',
    description: 'We are producing the announcement trailer for our upcoming sci-fi title. We need a director capable of maintaining multi-shot spatial environments and atmospheric pacing.',
    visualStyle: 'Gritty neon rain, heavy anamorphic grain, industrial cyber-infrastructure',
    commercialIndemnityRequired: true,
    proposalsCount: 11,
    hiringManager: {
      name: 'Marcus Thorne',
      role: 'Cinematic Director',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCij3obne7IFDqKMvCjv5EMv2GapQ5YogB2lUVQyXh7nHbQu-asu8YilXKGvNpcUyyzhIMquwDJCQpyXzCQb4xNiW9YszYK3_80XSb7ENN0BIl3zQqdHzNUZh_YDO9oSEQ09WHlPU67MDSPNLTTcUbQP94EqOONkWdUeVtkV-oksOLkhrjhJBTrAU-YIQOTYKndG5KopOWEDqNH8kmSviJ-W_cwVvKi8aP4tYKn9Loong4iUJctzK-mmw'
    }
  },
  {
    id: 'opp-cybernetic-5',
    title: 'Spatial Audio Sphere: 3D Gaussian Splat Acoustics (30s)',
    brandName: 'Cybernetic Acoustics',
    brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav2DMckAdIJh1K-tJbMHEk9VlM4qxybDvtbSxtbW6AyddBok2o5B1KhFhykysc1oOUDdjGDc3xcnWXJkBau70amoo44n3iiTatCQdLh8egMA19_59qaJcwHBRHEzNal-Wk-LcSheyZypDVl5jGlw9KUT0oG-uwpEKoDz3IdpsN_imqXYV6vpwPgekISZlSrq_k_QctPxrr9I8Ds90Wi1ZWDlvvW13v3SCCnLaOiBTFVZ-5_wzIdPWhw',
    industry: 'Consumer Tech & Hardware',
    budget: 11500,
    escrowStatus: 'Escrow Ready',
    duration: '30s Product Spot',
    turnaroundDays: '4 Days',
    deadline: 'In 4 Days',
    requiredTools: ['3D Gaussian Splatting', 'Runway Gen-3', 'DaVinci Studio'],
    deliverables: ['4K Product Master', 'Exploded View Splat Animation', 'Interactive WebM Asset'],
    objective: 'Visualize sound wave propagation and noise cancellation fields interacting with architectural acoustics.',
    description: 'Hardware company releasing revolutionary spatial headphones. Commercial requires dynamic camera motion travelling through splatted interior rooms.',
    visualStyle: 'Sleek dark mode, luminous neon frequency waveforms, high-end industrial design',
    commercialIndemnityRequired: true,
    proposalsCount: 5,
    hiringManager: {
      name: 'Elena Rostova',
      role: 'Creative Director (Client-side)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP2lfu9UXNDq9tYAwayIEVhqtQclX6ONJod2d6dEaAXdJ34ZgFbZRVZTL9mCyoiGgnUO_EJeZX8EeCdb-o2g9lozzXC5x4Q_oFJeSI82onpvNrNBR-MALd9mVMaMMiCfH2na6K8JFUzuIw_nz7WWi-5WdUDxXL8IbTNi7v3xeK3Yr59WJIcQMZLNOnN1iv5hXcndeU6XvJN9oT2ekoHsnBBnE5rOIKo9s9kF_53w2Wx3gcSnNrVt496w'
    }
  }
];

export const BRAND_CLIENTS: BrandClientProfile[] = [
  {
    id: 'brand-aura',
    name: 'Aura Automotive Corp.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qncopisa7mFRrDStFxVrqtIzvV6l6JY_m5nkaTCwYGyzQrNiTwKsty2qwuQX_54gtHdwrnDXngU3aTGiumhfCeyrTZhiqRyRHGOuLhnoXis-3_nT41mgJTw81_-EJYPyTYi8LOnpaVEpppnuPE37iqHYgWbooX2gOU3MhP7RKIpe9gImz9wcfTTGYQRcIrrnArgrrNkF2vMOMnD2iAfDaN2eEOHV0lVdudWWRPkvPzbp4XY-yA-abA',
    industry: 'Automotive & Mobility',
    location: 'Stuttgart & Los Angeles',
    totalSpentOnGenerativeAI: '$85,000+',
    campaignsCompleted: 8,
    openBriefsCount: 2,
    paymentScore: 5.0,
    escrowReliability: '100% On-time Sign-off',
    description: 'Pioneering electric mobility brand commissioning photoreal generative spots with full $250k commercial IP indemnification.',
    verifiedEnterprise: true,
    activeBriefs: ['Luminary Hypercar Global Commercial Teaser (30s Spot)', 'Autonomous Urban EV Interior Featurette (15s)']
  },
  {
    id: 'brand-vogue',
    name: 'Maison Éthéré / Vogue Digital',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP2lfu9UXNDq9tYAwayIEVhqtQclX6ONJod2d6dEaAXdJ34ZgFbZRVZTL9mCyoiGgnUO_EJeZX8EeCdb-o2g9lozzXC5x4Q_oFJeSI82onpvNrNBR-MALd9mVMaMMiCfH2na6K8JFUzuIw_nz7WWi-5WdUDxXL8IbTNi7v3xeK3Yr59WJIcQMZLNOnN1iv5hXcndeU6XvJN9oT2ekoHsnBBnE5rOIKo9s9kF_53w2Wx3gcSnNrVt496w',
    industry: 'Luxury Fashion & Publishing',
    location: 'Paris, France',
    totalSpentOnGenerativeAI: '$62,000+',
    campaignsCompleted: 6,
    openBriefsCount: 1,
    paymentScore: 4.9,
    escrowReliability: '100% Escrow Funded',
    description: 'Haute couture house partnering with generative artists to produce runway visuals, editorial lookbooks, and fluid textile simulations.',
    verifiedEnterprise: true,
    activeBriefs: ['Paris Haute Couture Digital Runway & Liquid Silk Film (45s)']
  },
  {
    id: 'brand-zenith',
    name: 'Zenith Horology Lab',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1W2OTC-q8SVmbjDV0VYp6G3PC-ukilRkaZyDyPkNpZP2gURrHT7pxei1g3LE5f0_oTENa6LdLU9fsGEEhtdlHJiKEqDlldAz6gQUMEs9lTM6q-_IfdhIY5xfuaC3Ft7LWpTbKRthfmnvgY4mmhrlPtwljDe_96NvfmS-UIgqa7WPksLyMenAd49nbTRh3DvezRPRf6rfPGTI2WE1GZE4eUK59V6IPLpaDAFgLWC5NgAcvXIn8vBmD3Q',
    industry: 'Swiss Luxury Timepieces',
    location: 'Geneva, Switzerland',
    totalSpentOnGenerativeAI: '$48,000+',
    campaignsCompleted: 5,
    openBriefsCount: 1,
    paymentScore: 5.0,
    escrowReliability: 'Instant Milestone Release',
    description: 'Swiss timepiece house using generative 3D macro animation for mechanical precision and luxury watch debuts.',
    verifiedEnterprise: true,
    activeBriefs: ['Quantum Chronograph Tourbillon Macro Animation (15s)']
  },
  {
    id: 'brand-apex',
    name: 'Apex Interactive Games',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClqgpkpgTJyIyIKDi-g-C64LzZpN7IOirM4F4Ny7D9ij-eHQ9MoxVzQHH7j3qaR0QYUNEaJ9N_C9t0W2VFIBsyHB2YXUktKwpMMgpF77DhYAtk7W3a7GsP1gBIcMXSi89wwkVzYzcqmlXAI6vQ9s637Wm9ad51A1MbpOFJMqPUCk4qwfTr1IqV9JXZX7oPF9mvlTprJBLLy2wa2TWPfqupT9e7v38JnzJ6SMfCCvhVDCv34PrpFkovgw',
    industry: 'Gaming & Virtual Worlds',
    location: 'Tokyo & Austin',
    totalSpentOnGenerativeAI: '$110,000+',
    campaignsCompleted: 12,
    openBriefsCount: 3,
    paymentScore: 4.95,
    escrowReliability: '100% Escrow Funded',
    description: 'AAA gaming studio commissioning cinematic worldbuilding and trailer sequences from vetted AI filmmakers.',
    verifiedEnterprise: true,
    activeBriefs: ['Neon District — AAA Cyberpunk Worldbuilding Trailer (60s)', 'Mecha Combat Intro Cinematic (45s)']
  }
];

