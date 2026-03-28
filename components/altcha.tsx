"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha'

interface AltchaProps {
  onStateChange?: (ev: CustomEvent) => void
  className?: string
}

export interface AltchaRef {
  value: string | null
}

const Altcha = forwardRef<AltchaRef, AltchaProps>(({ onStateChange, className }, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRef = useRef<any>(null)
  const [value, setValue] = useState<string | null>(null)

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: CustomEvent) => {
      if (ev.detail) {
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */
  return (
    // @ts-expect-error - altcha-widget is a custom element not in JSX intrinsics
    <altcha-widget
      ref={widgetRef}
      className={className}
      style={{
        '--altcha-max-width': '100%',
      }}
      challengeurl="/api/captcha/challenge"
      debug
      test
    />
  )
})

Altcha.displayName = 'Altcha'

export default Altcha
