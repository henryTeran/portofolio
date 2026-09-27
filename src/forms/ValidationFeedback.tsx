import { formCopy } from './copy';
import { fieldIssue, limits, type Field } from './validation';

export function CharacterCounter({ value, min = 0, max, language }: { value: string; min?: number; max: number; language: string }) {
  const length = value.trim().length;
  const copy = formCopy(language);
  return <span className="block tabular-nums">{length < min ? `${length} / ${min} ${copy.minimum} · ${max} ${copy.maximum}` : `${length} / ${max}`}</span>;
}

export function FieldValidationMessage({ id, field, value, language, touched }: { id: string; field: Field; value: string; language: string; touched: boolean }) {
  const copy = formCopy(language);
  const issue = fieldIssue(field, value);
  const optional = ['phone', 'company', 'additionalInfo'].includes(field);
  const detailed = field === 'message' || field === 'projectDescription';
  const min = field === 'message' ? 30 : field === 'projectDescription' ? 50 : 0;
  const max = field in limits ? limits[field as keyof typeof limits] : 100;
  const text = issue ? touched ? copy[issue] : optional ? copy.optional : '' : optional && !value.trim() ? copy.optional : `✓ ${detailed ? field === 'message' ? copy.detailedMessage : copy.detailedDescription : copy.valid}`;
  return <p id={`${id}-feedback`} aria-live="polite" aria-atomic="true" className={`mt-2 text-sm ${issue && touched ? 'text-red-700 dark:text-red-300' : !issue && value.trim() ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>
    {text}{(detailed || field === 'additionalInfo') && <CharacterCounter value={value} min={min} max={max} language={language} />}
  </p>;
}

export function FormStatusSummary({ id, items, readyText, language, busy = false }: { id: string; items: { label: string; valid: boolean }[]; readyText: string; language: string; busy?: boolean }) {
  const copy = formCopy(language);
  const missing = items.filter(item => !item.valid);
  return <div id={id} aria-live="polite" aria-atomic="true" className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
    <ul className="flex flex-wrap gap-x-4 gap-y-1">{items.map(item => <li key={item.label}>{item.valid ? '✓' : '○'} {item.label}</li>)}</ul>
    <p>{busy ? copy.sending : missing.length ? `${copy.missing} ${missing.map(item => item.label).join(', ')}.` : `✓ ${readyText}`}</p>
  </div>;
}
