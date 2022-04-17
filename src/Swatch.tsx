/* eslint-disable import/no-namespace */
import React from 'react'
import * as styles from '@primer/primitives'

export interface SwatchProps {
  /**
   * The size of the swatch
   */
  size?: number
  /**
   * The hex value from Fuegokit Elements
   */
  hex?: string
  /**
   * The colorScheme from Fuegokit's color scales
   */
  colorScheme?: Record<
    keyof typeof styles.default.colors,
    Record<'colors' | 'shadows', Partial<typeof styles.default.colors.light>>
  >
}
/**
 * Use Swatch to display color modes and tokens from `@fuegokit/elements`.
 */
const Swatch = ({size = 24, hex}: SwatchProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect
        xmlns="http://www.w3.org/2000/svg"
        fill={hex}
        stroke="#0000001a"
        x="0"
        y="0"
        width="24"
        height="24"
        rx="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Swatch
