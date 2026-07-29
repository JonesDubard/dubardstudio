'use client';

import { useId, useState, type FormEvent } from 'react';
import Link from 'next/link';

type Answer = 'yes' | 'partial' | 'no' | '';

type Question = {
  id: string;
  prompt: string;
  help: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'problem',
    prompt: 'Do you have a clear business problem to solve (not just “we need a redesign”)?',
    help: 'Examples: weak conversion, unclear offer, trust gaps, ops friction online.',
  },
  {
    id: 'decision',
    prompt: 'Can someone with decision access join the first conversation?',
    help: 'We work best when trade-offs can be decided, not only discussed.',
  },
  {
    id: 'coherence',
    prompt: 'Do you want brand, website, and digital ops to hold together as one system?',
    help: 'If the goal is a one-off visual refresh with no stewardship, we may not be the right fit.',
  },
  {
    id: 'integrity',
    prompt: 'Are you willing to prioritize honest claims, accessibility, and durable quality over shortcuts?',
    help: 'We decline work that needs dark patterns or unverifiable hype.',
  },
  {
    id: 'timeline',
    prompt: 'Is there a realistic window to do this well (not “launch tomorrow at any cost”)?',
    help: 'Rush jobs that skip discovery rarely produce outcomes that last.',
  },
];

type Outcome = 'likely' | 'talk' | 'not-yet';

function scoreOutcome(answers: Record<string, Answer>): Outcome | null {
  const values = QUESTIONS.map(q => answers[q.id]);
  if (values.some(v => !v)) return null;

  const yes = values.filter(v => v === 'yes').length;
  const no = values.filter(v => v === 'no').length;

  if (no >= 2) return 'not-yet';
  if (yes >= 4) return 'likely';
  return 'talk';
}

const OUTCOME_COPY: Record<
  Outcome,
  { title: string; body: string; primaryHref: string; primaryLabel: string }
> = {
  likely: {
    title: 'Likely a fit',
    body: 'Your answers suggest a conversation about scope and outcomes is worthwhile. Share the problem on Contact, or request a consultation time.',
    primaryHref: '/contact/',
    primaryLabel: 'Start a conversation',
  },
  talk: {
    title: 'Talk first',
    body: 'There is potential, but a few answers need clarifying. A short conversation will tell us both whether Dubard is the right partner—and what a sensible first step looks like.',
    primaryHref: '/book/',
    primaryLabel: 'Request a consultation',
  },
  'not-yet': {
    title: 'Probably not yet',
    body: 'Based on these answers, we may not be the right partner right now. That is an honest read, not a soft no. Browse Approach and Work; return when the problem and decision path are clearer.',
    primaryHref: '/approach/',
    primaryLabel: 'Read our approach',
  },
};

export default function FitChecklist() {
  const baseId = useId();
  const [answers, setAnswers] = useState<Record<string, Answer>>(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.id, '' as Answer]))
  );
  const [submitted, setSubmitted] = useState(false);

  const outcome = scoreOutcome(answers);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!outcome) return;
    setSubmitted(true);
  }

  function reset() {
    setAnswers(Object.fromEntries(QUESTIONS.map(q => [q.id, '' as Answer])));
    setSubmitted(false);
  }

  if (submitted && outcome) {
    const copy = OUTCOME_COPY[outcome];
    return (
      <div className="fit-result" role="status" aria-live="polite">
        <p className="fit-result-label">Guidance (not a score)</p>
        <h2 className="fit-result-title">{copy.title}</h2>
        <p className="fit-result-body">{copy.body}</p>
        <div className="fit-result-actions">
          <Link href={copy.primaryHref} className="btn btn-primary">
            {copy.primaryLabel}
          </Link>
          {outcome !== 'likely' && (
            <Link href="/contact/" className="btn btn-outline">
              Contact anyway
            </Link>
          )}
          {outcome === 'likely' && (
            <Link href="/book/" className="btn btn-outline">
              Book a consultation
            </Link>
          )}
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Retake checklist
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="fit-form" onSubmit={onSubmit}>
      <ol className="fit-questions">
        {QUESTIONS.map((q, index) => {
          const name = q.id;
          const legendId = `${baseId}-${name}-legend`;
          return (
            <li key={q.id} className="fit-question">
              <fieldset className="fit-fieldset">
                <legend id={legendId} className="fit-prompt">
                  <span className="fit-index" aria-hidden="true">
                    {index + 1}.
                  </span>{' '}
                  {q.prompt}
                </legend>
                <p className="fit-help" id={`${baseId}-${name}-help`}>
                  {q.help}
                </p>
                <div className="fit-options" role="group" aria-labelledby={legendId}>
                  {(
                    [
                      ['yes', 'Yes'],
                      ['partial', 'Partly'],
                      ['no', 'No'],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value} className="fit-option">
                      <input
                        type="radio"
                        name={name}
                        value={value}
                        checked={answers[name] === value}
                        onChange={() => setAnswers(prev => ({ ...prev, [name]: value }))}
                        required
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <p className="fit-disclaimer">
        This is a self-check for fit—not a ranked score, audit, or guarantee of engagement.
      </p>

      <div className="fit-form-actions">
        <button type="submit" className="btn btn-primary" disabled={!outcome}>
          See guidance
        </button>
        <Link href="/contact/" className="btn btn-outline">
          Skip to contact
        </Link>
      </div>
    </form>
  );
}
