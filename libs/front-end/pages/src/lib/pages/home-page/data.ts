import { ImageType } from '@shared';
import type { LeadingSectionContent } from '../../details/home-page/leading-section/leading-section';
import type { LogosSectionContent } from '../../details/home-page/logos-section/logos-section';
import type { ServicesSectionContent } from '../../details/home-page/services-section/services-section';
import type { PromoSectionContent } from '../../details/home-page/promo-section/promo-section';
import type { StudiesSectionContent } from '../../details/home-page/studies-section/studies-section';
import type { WorkflowSectionContent } from '../../details/home-page/workflow-section/workflow-section';
import type { TeamSectionContent } from '../../details/home-page/team-section';
import type { TestimonialsSectionContent } from '../../details/home-page/testimonials-section/testimonials-section';
import type { ContactUsContent } from '../../details/home-page/contact-us/contact-us';

export interface HomePageContent {
  leadingSection: LeadingSectionContent;
  logosSection: LogosSectionContent;
  servicesSection: ServicesSectionContent;
  promoSection: PromoSectionContent;
  studiesSection: StudiesSectionContent;
  workflowSection: WorkflowSectionContent;
  teamSection: TeamSectionContent;
  testimonialsSection: TestimonialsSectionContent;
  contactUsSection: ContactUsContent;
}

export const homePageContent: HomePageContent = {
  leadingSection: {
    title: 'Navigating the digital landscape for success',
    description:
      'Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.',
    button: {
      id: 'leading-section-button',
      text: 'Book a consultation',
      url: '/',
    },
    img: {
      id: 'leading-section-image',
      src: '/images/home-page/megaphone.svg',
      alt: 'Digital marketing illustration',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  logosSection: {
    logos: {
      children: [
        {
          id: 'logos-section-amazon',
          src: '/images/home-page/logos/amazon.svg',
          alt: 'Amazon logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'logos-section-dribbble',
          src: '/images/home-page/logos/dribbble.svg',
          alt: 'Dribbble logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'logos-section-hubspot',
          src: '/images/home-page/logos/hubspot.svg',
          alt: 'HubSpot logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'logos-section-notion',
          src: '/images/home-page/logos/notion.svg',
          alt: 'Notion logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'logos-section-netflix',
          src: '/images/home-page/logos/netflix.svg',
          alt: 'Netflix logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'logos-section-zoom',
          src: '/images/home-page/logos/zoom.svg',
          alt: 'Zoom logo',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  },
  servicesSection: {
    title: 'Services',
    description:
      'At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:',
    cards: [
      {
        id: 'services-search-engine-optimization',
        title: 'Search engine optimization',
        button: {
          id: 'services-link-seo',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-seo',
          src: 'images/home-page/services-section/tokyo-magnifier-web-search-with-elements.png',
          alt: 'Search engine optimization illustration with magnifier and interface elements',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 165,
      },
      {
        id: 'services-pay-per-click-advertising',
        title: 'Pay-per-click advertising',
        button: {
          id: 'services-link-ppc',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-ppc',
          src: 'images/home-page/services-section/tokyo-selecting-a-value-in-the-browser-window.png',
          alt: 'Pay-per-click advertising illustration with cursor and browser window',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 165,
      },
      {
        id: 'services-social-media-marketing',
        title: 'Social Media Marketing',
        button: {
          id: 'services-link-social-media',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-social-media',
          src: 'images/home-page/services-section/tokyo-browser-window-with-emoticon-likes-and-stars-around.png',
          alt: 'Social media marketing illustration with notifications and ratings',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 127,
      },
      {
        id: 'services-email-marketing',
        title: 'Email Marketing',
        button: {
          id: 'services-link-email-marketing',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-email-marketing',
          src: 'images/home-page/services-section/tokyo-sending-messages-from-one-place-to-another.png',
          alt: 'Email marketing illustration with envelopes moving between points',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 155,
      },
      {
        id: 'services-content-creation',
        title: 'Content Creation',
        button: {
          id: 'services-link-content-creation',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-content-creation',
          src: 'images/home-page/services-section/tokyo-many-browser-windows-with-different-information.png',
          alt: 'Content creation illustration with stacked browser windows',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 138,
      },
      {
        id: 'services-analytics-and-tracking',
        title: 'Analytics and Tracking',
        button: {
          id: 'services-link-analytics-tracking',
          text: 'Learn more',
          url: '/',
        },
        image: {
          id: 'services-image-analytics-tracking',
          src: 'images/home-page/services-section/tokyo-volumetric-analytics-of-different-types-in-web-browsers.png',
          alt: 'Analytics and tracking illustration with dashboard charts',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageWidthMobile: 157,
      },
    ],
  },
  promoSection: {
    title: "Let's make things happen",
    description:
      'Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.',
    button: {
      id: 'promo-section-button',
      text: 'Get your free proposal',
      url: '/',
    },
    buttonMobile: {
      id: 'promo-section-button-mobile',
      text: 'Get your proposal',
      url: '/',
    },
    img: {
      id: 'promo-section-illustration',
      src: '/images/home-page/promo-section/things-happen-illustration.png',
      alt: 'Decorative stars and smiley illustration',
      type: ImageType.RegularImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  studiesSection: {
    title: 'Case Studies',
    description:
      'Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies',
    items: [
      {
        id: 'case-study-restaurant',
        description:
          'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
        button: {
          id: 'case-study-restaurant-btn',
          text: 'Learn more',
          url: '/',
        },
      },
      {
        id: 'case-study-b2b',
        description:
          'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
        button: {
          id: 'case-study-b2b-btn',
          text: 'Learn more',
          url: '/',
        },
      },
      {
        id: 'case-study-retail',
        description:
          'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.',
        button: {
          id: 'case-study-retail-btn',
          text: 'Learn more',
          url: '/',
        },
      },
    ],
  },
  workflowSection: {
    title: 'Our Working Process',
    description: 'Step-by-Step Guide to Achieving Your Business Goals',
    steps: [
      {
        id: 'workflow-consultation',
        order: '01',
        title: 'Consultation',
        description:
          'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
      },
      {
        id: 'workflow-research-and-strategy-development',
        order: '02',
        title: 'Research and Strategy Development',
        description:
          'We analyze your market, competitors, and current performance to build a tailored strategy with clear priorities, channels, and measurable outcomes.',
      },
      {
        id: 'workflow-implementation',
        order: '03',
        title: 'Implementation',
        description:
          'Our team launches the agreed initiatives across selected channels, coordinating content, campaigns, and technical updates for a smooth rollout.',
      },
      {
        id: 'workflow-monitoring-and-optimization',
        order: '04',
        title: 'Monitoring and Optimization',
        description:
          'We continuously track performance and optimize campaigns, messaging, and budgets to improve results based on real-time data.',
      },
      {
        id: 'workflow-reporting-and-communication',
        order: '05',
        title: 'Reporting and Communication',
        description:
          'You receive regular updates with transparent reporting, actionable insights, and next steps so decisions remain aligned with your business goals.',
      },
      {
        id: 'workflow-continual-improvement',
        order: '06',
        title: 'Continual Improvement',
        description:
          'We iterate on proven tactics and test new opportunities to keep your growth momentum strong as market conditions evolve.',
      },
    ],
  },
  teamSection: {
    title: 'Team',
    description:
      'Meet the skilled and experienced team behind our successful digital marketing strategies',
    button: {
      id: 'team-section-see-all-team-button',
      text: 'See all team',
      url: '/',
    },
    employees: [
      {
        id: 'employee-card-john-smith',
        name: 'John Smith',
        position: 'CEO and Founder',
        description:
          '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
        photo: {
          id: 'employee-card-john-smith-photo',
          src: 'images/home-page/team-section/john-smith.jpg',
          alt: 'Portrait of John Smith',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-john-smith-linkedin-link',
          text: 'John Smith on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
      {
        id: 'employee-card-jane-doe',
        name: 'Jane Doe',
        position: 'Director of Operations',
        description:
          '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
        photo: {
          id: 'employee-card-jane-doe-photo',
          src: 'images/home-page/team-section/jane-doe.jpg',
          alt: 'Portrait of Jane Doe',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-jane-doe-linkedin-link',
          text: 'Jane Doe on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
      {
        id: 'employee-card-michael-brown',
        name: 'Michael Brown',
        position: 'Senior SEO Specialist',
        description:
          '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
        photo: {
          id: 'employee-card-michael-brown-photo',
          src: 'images/home-page/team-section/michael-brown.jpg',
          alt: 'Portrait of Michael Brown',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-michael-brown-linkedin-link',
          text: 'Michael Brown on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
      {
        id: 'employee-card-emily-johnson',
        name: 'Emily Johnson',
        position: 'PPC Manager',
        description:
          '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
        photo: {
          id: 'employee-card-emily-johnson-photo',
          src: 'images/home-page/team-section/emily-johnson.jpg',
          alt: 'Portrait of Emily Johnson',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-emily-johnson-linkedin-link',
          text: 'Emily Johnson on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
      {
        id: 'employee-card-brian-williams',
        name: 'Brian Williams',
        position: 'Social Media Specialist',
        description:
          '4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement',
        photo: {
          id: 'employee-card-brian-williams-photo',
          src: 'images/home-page/team-section/brian-williams.jpg',
          alt: 'Portrait of Brian Williams',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-brian-williams-linkedin-link',
          text: 'Brian Williams on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
      {
        id: 'employee-card-sarah-kim',
        name: 'Sarah Kim',
        position: 'Content Creator',
        description:
          '2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries',
        photo: {
          id: 'employee-card-sarah-kim-photo',
          src: 'images/home-page/team-section/sarah-kim.jpg',
          alt: 'Portrait of Sarah Kim',
          type: ImageType.RegularImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        socialLink: {
          id: 'employee-card-sarah-kim-linkedin-link',
          text: 'Sarah Kim on LinkedIn',
          url: 'https://www.linkedin.com/',
        },
      },
    ],
  },
  testimonialsSection: {
    title: 'Testimonials',
    description:
      'Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services',
    items: [
      {
        id: 'testimonial-john-smith',
        quote:
          '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
        author: 'John Smith',
        position: 'Marketing Director at XYZ Corp',
      },
      {
        id: 'testimonial-jane-doe',
        quote:
          '"Positivus transformed our lead generation process. Their strategic campaigns helped us attract high-quality prospects and improved our conversion rate quarter over quarter. Communication is always fast, clear, and focused on outcomes."',
        author: 'Jane Doe',
        position: 'Head of Growth at BrightPath',
      },
      {
        id: 'testimonial-michael-brown',
        quote:
          '"From SEO improvements to paid media optimization, every recommendation was practical and data-driven. We saw meaningful gains in organic visibility and measurable ROI in just a few months."',
        author: 'Michael Brown',
        position: 'Founder at MarketFlow',
      },
      {
        id: 'testimonial-emily-johnson',
        quote:
          '"Working with Positivus feels like having an extension of our own team. They quickly understood our brand, proposed a clear plan, and executed with consistency. Our traffic and engagement are now at an all-time high."',
        author: 'Emily Johnson',
        position: 'CMO at NovaRetail',
      },
      {
        id: 'testimonial-daniel-kim',
        quote:
          '"Their ability to combine creative messaging with performance analysis is exceptional. We appreciate how transparent they are with reporting and how proactively they suggest improvements every month."',
        author: 'Daniel Kim',
        position: 'Operations Lead at CoreStack',
      },
      {
        id: 'testimonial-daniel-kim-5',
        quote:
          '"Their ability to combine creative messaging with performance analysis is exceptional. We appreciate how transparent they are with reporting and how proactively they suggest improvements every month."',
        author: 'Daniel Kim',
        position: 'Operations Lead at CoreStack',
      },
    ],
  },
  contactUsSection: {
    title: 'Contact Us',
    description: "Connect with Us: Let's Discuss Your Digital Marketing Needs",
    form: {
      name: {
        label: 'Name',
        placeholder: 'Name',
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      message: {
        label: 'Message',
        placeholder: 'Enter your message',
      },
      action: {
        sayHi: {
          label: 'Say Hi',
        },
        getAQuote: {
          label: 'Get a Quote',
        },
      },
      submitButton: {
        text: 'Send Message',
        loadingText: 'Sending...',
      },
    },
  },
};
