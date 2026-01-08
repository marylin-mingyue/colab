import type { BadgeLevel } from '../state/types'

export type Choice = { id: string; label: string }

export type Scenario = {
  id: string
  prompt: string
  choices: Choice[]
  correctChoiceId: string
  aiFeedbackByChoiceId: Record<string, string>
}

export const LEARNING: Record<BadgeLevel, { title: string; scenarios: Scenario[] }> = {
  INSURANCE: {
    title: 'Level 1 — Insurance (HK)',
    scenarios: [
      {
        id: 'ins_1',
        prompt:
          'You just bought a new phone (HKD 6,000). You have HKD 1,500 savings. Which is the most sensible protection?',
        choices: [
          { id: 'a', label: 'Buy expensive phone insurance with high premium right away' },
          { id: 'b', label: 'Use a basic plan (or bank/retail protection) with clear exclusions; keep emergency cash' },
          { id: 'c', label: 'No protection; if it breaks, borrow money and replace immediately' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'This may be over-insurance for your current savings. Premiums can be a hidden drag. Check deductibles and exclusions.',
          b: 'Good. You balanced affordability, exclusions, and liquidity. Insurance should reduce catastrophic loss, not drain cashflow.',
          c: 'Risky. Replacing the phone could wipe out savings or create high-cost debt. Insurance is about smoothing shocks.',
        },
      },
      {
        id: 'ins_2',
        prompt: 'A friend offers you an “investment-linked insurance” with guaranteed high returns. What do you do first?',
        choices: [
          { id: 'a', label: 'Sign now — guarantees mean no risk' },
          { id: 'b', label: 'Ask for fee schedule, surrender charges, and regulator-licensed distributor details' },
          { id: 'c', label: 'Borrow to maximize returns while you are young' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: '“Guaranteed high returns” is a classic red flag. Always read fees, surrender penalties, and verify licensing.',
          b: 'Correct. In HK, verify licensing and fully understand fees + lock-up. “Return” is meaningless without constraints.',
          c: 'Leverage amplifies risk. Borrowing for insurance-linked products can create long-term lock-in and cashflow stress.',
        },
      },
      {
        id: 'ins_3',
        prompt: 'Your travel plan is short and low-budget. Which is the best approach?',
        choices: [
          { id: 'a', label: 'Skip all travel insurance to save money' },
          { id: 'b', label: 'Buy a simple plan covering medical + trip cancellation within budget' },
          { id: 'c', label: 'Buy the most expensive plan regardless of coverage details' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'Travel emergencies can be financially catastrophic. Skipping insurance can be a false economy.',
          b: 'Good. Prioritize high-impact risks (medical, major cancellation) and keep it within budget.',
          c: 'Overpaying doesn’t guarantee better coverage. Always compare exclusions and claim process.',
        },
      },
    ],
  },
  INVESTING: {
    title: 'Level 2 — Investing basics',
    scenarios: [
      {
        id: 'inv_1',
        prompt: 'You saved HKD 3,000. Choose between: bank savings 0.5%/year vs tokenized green bond ~2.5%/year.',
        choices: [
          { id: 'a', label: 'All-in high volatility assets for faster gains' },
          { id: 'b', label: 'Start with low-risk tokenized bond + keep emergency buffer' },
          { id: 'c', label: 'Do nothing; avoid learning' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'That’s mismatched risk. Small savings should prioritize survival and learning, not gambling.',
          b: 'Correct. You improved yield while keeping risk manageable. Small, consistent steps beat impulsive bets.',
          c: 'Avoidance can be costly long-term. Start with low-risk, learn the basics, then expand.',
        },
      },
      {
        id: 'inv_2',
        prompt: 'Market drops 8% this week. What’s your best first action?',
        choices: [
          { id: 'a', label: 'Panic sell everything immediately' },
          { id: 'b', label: 'Check your risk level and time horizon; rebalance if needed' },
          { id: 'c', label: 'Double down on the riskiest asset without thinking' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'This is loss aversion + recency bias. Selling low locks in losses.',
          b: 'Correct. If your plan didn’t change, don’t let price noise dictate decisions. Rebalance thoughtfully.',
          c: 'Revenge trading is dangerous. Risk should be earned through evidence, not emotions.',
        },
      },
      {
        id: 'inv_3',
        prompt: 'Which metric helps you understand downside risk better than “average return”?',
        choices: [
          { id: 'a', label: 'Max drawdown' },
          { id: 'b', label: 'Number of social media likes' },
          { id: 'c', label: 'How confident you feel' },
        ],
        correctChoiceId: 'a',
        aiFeedbackByChoiceId: {
          a: 'Correct. Max drawdown approximates “how bad can it get” during stress.',
          b: 'Likes are not due diligence. Popularity can be herd behavior.',
          c: 'Confidence is not accuracy. Use data, not feelings, to gauge risk.',
        },
      },
    ],
  },
  ESG: {
    title: 'Level 3 — ESG + RWA tokenization',
    scenarios: [
      {
        id: 'esg_1',
        prompt: 'Why tokenize real-world assets (RWA) like green bonds?',
        choices: [
          { id: 'a', label: 'To bypass all regulation' },
          { id: 'b', label: 'To enable fractional access + faster settlement with safer rails' },
          { id: 'c', label: 'Because it always increases returns' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'Wrong direction: tokenization should work with regulation, not against it.',
          b: 'Correct. Fractional ownership + programmable settlement can lower barriers while improving market infrastructure.',
          c: 'Tokenization is plumbing, not a guaranteed return booster. Risk/return depends on the underlying asset.',
        },
      },
      {
        id: 'esg_2',
        prompt: 'An ESG asset claims “100% green”. What is a responsible check?',
        choices: [
          { id: 'a', label: 'Trust the marketing headline' },
          { id: 'b', label: 'Look for reporting, use-of-proceeds, and third-party verification' },
          { id: 'c', label: 'Ignore ESG; it’s always fake' },
        ],
        correctChoiceId: 'b',
        aiFeedbackByChoiceId: {
          a: 'Greenwashing exists. Always ask for evidence.',
          b: 'Correct. ESG is about measurable impact and governance, not slogans.',
          c: 'Over-generalizing is another bias. Do diligence instead of dismissing.',
        },
      },
      {
        id: 'esg_3',
        prompt: 'In an e-HKD based tokenized settlement system, what can “programmability” do?',
        choices: [
          { id: 'a', label: 'Enforce spending limits + whitelists for investor protection' },
          { id: 'b', label: 'Guarantee profit' },
          { id: 'c', label: 'Remove the need for risk disclosure' },
        ],
        correctChoiceId: 'a',
        aiFeedbackByChoiceId: {
          a: 'Correct. Programmable constraints can reduce fraud and align incentives (e.g., only eligible assets, expiry).',
          b: 'No system can guarantee profit. It can only enforce rules.',
          c: 'Risk disclosure remains critical. Tech doesn’t replace transparency.',
        },
      },
    ],
  },
}


