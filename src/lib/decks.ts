import type { Deck } from './types';

export const DEFAULT_DECKS: Deck[] = [
  {
    id: 'stoic-reflections',
    title: 'Stoic Wisdom',
    description: 'Timeless reflections on focus, resilience, and inner clarity.',
    icon: '🏛️',
    chunks: [
      {
        id: 'stoic-1',
        text: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
        author: 'Marcus Aurelius',
        source: 'Meditations'
      },
      {
        id: 'stoic-2',
        text: 'We suffer more often in imagination than in reality.',
        author: 'Seneca',
        source: 'Letters from a Stoic'
      },
      {
        id: 'stoic-3',
        text: 'No man is free who is not master of himself.',
        author: 'Epictetus',
        source: 'Discourses'
      },
      {
        id: 'stoic-4',
        text: 'Waste no more time arguing about what a good man should be. Be one.',
        author: 'Marcus Aurelius',
        source: 'Meditations'
      },
      {
        id: 'stoic-5',
        text: 'He who fears death will never do anything worthy of a man who is alive.',
        author: 'Seneca',
        source: 'On Peace of Mind'
      },
      {
        id: 'stoic-6',
        text: 'If you want to improve, be content to be thought foolish and stupid.',
        author: 'Epictetus',
        source: 'Enchiridion'
      },
      {
        id: 'stoic-7',
        text: 'The soul becomes dyed with the color of its thoughts.',
        author: 'Marcus Aurelius',
        source: 'Meditations'
      },
      {
        id: 'stoic-8',
        text: 'Begin at once to live, and count each separate day as a separate life.',
        author: 'Seneca',
        source: 'Moral Letters'
      }
    ]
  },
  {
    id: 'mental-models',
    title: 'Mental Models',
    description: 'Frameworks to sharpen reasoning and decision-making.',
    icon: '🧠',
    chunks: [
      {
        id: 'mm-1',
        text: 'First Principles Thinking: Boil a problem down to its fundamental truths that cannot be deduced any further, then build up your solution from there.',
        author: 'Aristotle & Elon Musk',
        source: 'Reasoning Frameworks'
      },
      {
        id: 'mm-2',
        text: 'Inversion: Instead of thinking about how to achieve success, think deeply about how to avoid failure. Solving for failure often reveals the clearest path to success.',
        author: 'Charlie Munger',
        source: 'Algebra of Thinking'
      },
      {
        id: 'mm-3',
        text: "Occam's Razor: Among competing hypotheses, the simplest explanation that makes the fewest assumptions is usually the correct one.",
        author: 'William of Ockham',
        source: 'Logic & Science'
      },
      {
        id: 'mm-4',
        text: 'The Pareto Principle: 80% of outputs result from 20% of inputs. Identify the vital few levers that drive the vast majority of your outcomes.',
        author: 'Vilfredo Pareto',
        source: 'Efficiency Models'
      },
      {
        id: 'mm-5',
        text: "Chesterton's Fence: Never destroy a fence or rule until you understand the original reason why it was put there in the first place.",
        author: 'G.K. Chesterton',
        source: 'System Reform'
      },
      {
        id: 'mm-6',
        text: 'Second-Order Thinking: Ask "And then what?" Consider not just the immediate result of an action, but the subsequent consequences down the line.',
        author: 'Howard Marks',
        source: 'Decision Making'
      }
    ]
  },
  {
    id: 'minimalism-design',
    title: 'Design & Focus',
    description: 'Aphorisms on clarity, craftsmanship, and simplicity.',
    icon: '✦',
    chunks: [
      {
        id: 'design-1',
        text: 'Simplicity is about subtracting the obvious and adding the meaningful.',
        author: 'John Maeda',
        source: 'The Laws of Simplicity'
      },
      {
        id: 'design-2',
        text: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
        author: 'Antoine de Saint-Exupéry',
        source: 'Airman’s Odyssey'
      },
      {
        id: 'design-3',
        text: 'Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects.',
        author: 'Dieter Rams',
        source: '10 Principles for Good Design'
      },
      {
        id: 'design-4',
        text: 'Clarity is not an aesthetic choice, but an act of empathy for the reader.',
        author: 'Minimalist Maxim',
        source: 'Writing & Interface'
      },
      {
        id: 'design-5',
        text: 'Do one thing, do it exceptionally well, and eliminate everything else that creates noise.',
        author: 'Unix Philosophy',
        source: 'Software Engineering'
      },
      {
        id: 'design-6',
        text: 'White space is not empty space; it is room for the mind to breathe.',
        author: 'Typographic Rule',
        source: 'Visual Layout'
      }
    ]
  },
  {
    id: 'creative-prompts',
    title: 'Creative Sparks',
    description: 'Short prompts and questions to ignite writing and introspection.',
    icon: '💡',
    chunks: [
      {
        id: 'cp-1',
        text: 'Describe a place from your childhood using only sensory details — smell, sound, texture — without ever naming the location.',
        author: 'Writing Prompt',
        source: 'Creativity Deck'
      },
      {
        id: 'cp-2',
        text: 'What is a truth you strongly believe that almost nobody agrees with you on?',
        author: 'Peter Thiel',
        source: 'Zero to One'
      },
      {
        id: 'cp-3',
        text: 'If you were guaranteed to succeed in one project over the next 6 months, what project would you start today?',
        author: 'Reflective Question',
        source: 'Journaling'
      },
      {
        id: 'cp-4',
        text: 'Write down three habits you perform every day without thinking, and evaluate whether they serve your future self.',
        author: 'Atomic Habits',
        source: 'Self Observation'
      },
      {
        id: 'cp-5',
        text: 'Imagine a conversation between your 18-year-old self and your 80-year-old self. What warning does the elder give?',
        author: 'Perspective Prompt',
        source: 'Fiction & Life'
      }
    ]
  }
];
