import horizontal from '../../logo/svg/kanso-horizontal.svg?raw'
import mark from '../../logo/svg/kanso-mark.svg?raw'
import stacked from '../../logo/svg/kanso-stacked.svg?raw'

// The logo drawn inline from its SVG master, in currentColor, so it takes the
// text colour of wherever it sits: ink on paper, light on night, in either
// scheme, whether the OS or data-theme chose it. The downloads are the files
// themselves; this is only the page's own use of them.
const masters = { horizontal, mark, stacked }

function inline(svg: string) {
  return svg
    .replace(/<title>[^<]*<\/title>\s*/, '')
    .replace(/ width="[^"]*" height="[^"]*"/, '')
    .replace(/ role="img"/, ' aria-hidden="true" focusable="false"')
    .replaceAll('fill="#1a1a1a"', 'fill="currentColor"')
}

export function Logo({
  className,
  form,
  label = 'Kanso Labs',
}: {
  className?: string
  form: keyof typeof masters
  label?: string
}) {
  return (
    <span
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`logo logo--${form}${className ? ` ${className}` : ''}`}
      dangerouslySetInnerHTML={{ __html: inline(masters[form]) }}
      role={label ? 'img' : undefined}
    />
  )
}

// Daily's mark, as kanso-labs/daily ships it in public/favicon.svg. It is
// Daily's, not the brand's; it is drawn here only to show how a product sits
// under Kanso Labs, so its colours are its own in both schemes.
export function DailyMark() {
  return (
    <svg
      aria-label="Daily's mark"
      height="48"
      role="img"
      viewBox="0 0 64 64"
      width="48"
    >
      <path
        d="M64 32C64 61.41 61.41 64 32 64C2.59 64 0 61.41 0 32C0 2.59 2.59 0 32 0C61.41 0 64 2.59 64 32Z"
        fill="#654EA3"
      />
      <g fill="#FBF9F4">
        <path
          d="M26.22 25.19a12.69 12.69 0 1 1 0 25.38a12.69 12.69 0 1 1 0-25.38ZM26.22 32.71a5.17 5.17 0 1 0 0 10.34a5.17 5.17 0 1 0 0-10.34Z"
          fillRule="evenodd"
        />
        <rect height="37.13" rx="3.29" width="6.58" x="33.27" y="13.44" />
        <circle cx="46.9" cy="17.67" r="3.57" />
      </g>
    </svg>
  )
}
