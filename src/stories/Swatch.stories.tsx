import React, {ComponentProps} from 'react'
import {Meta, Story} from '@storybook/react'
// eslint-disable-next-line import/no-namespace
import * as styles from '@primer/primitives'

import {partitionColors, omitScale} from '../utils/theme'

import {Text, BaseStyles, Swatch} from '..'

type SwatchProps = ComponentProps<typeof Swatch>

export interface ProductColorScaleStoryProps {
  colorScheme: Record<
    keyof typeof styles.default.colors,
    Record<'colors' | 'shadows', Partial<typeof styles.default.colors.light>>
  >

  size: number
}

const colorSchemes = Object.entries(styles.default.colors).reduce((acc, [name, variables]) => {
  const {colors, shadows} = partitionColors(variables)
  acc[name] = {
    colors,
    shadows: omitScale(shadows)
  }
  return acc
}, {})

const colorScales = Object.entries(colorSchemes).map(scheme => {
  // rm mktg scale
  return Object.entries(scheme[1].colors.scale).filter(scale => {
    return scale[0] !== 'mktg'
  })
})

export default {
  title: 'Swatch',
  component: Swatch,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true
      }
    }
  },
  decorators: [
    // eslint-disable-next-line no-shadow
    Story => {
      return <BaseStyles>{Story()}</BaseStyles>
    }
  ],
  argTypes: {
    size: {
      control: 'number'
    },
    hex: {
      options: [
        '#FFFAE6',
        '#FFF0B3',
        '#FFE380',
        '#FFC400',
        '#E2B203',
        '#FFAB00',
        '#FF991F',
        '#FF8B00',
        '#CF9F02',
        '#B38600'
      ],
      control: {
        type: 'select'
      },
      table: {defaultValue: {summary: '#FFAB00'}}
    },
    sx: {
      table: {
        disable: true
      }
    },
    ref: {
      table: {
        disable: true
      }
    },
    theme: {
      table: {
        disable: true
      }
    },
    forwardedAs: {
      table: {
        disable: true
      }
    }
  }
} as Meta

export const swatch = (args: SwatchProps) => {
  return <Swatch {...args} />
}

swatch.args = {
  hex: '#FF8B00'
}
swatch.storyName = 'Swatch'

export const colorScale: Story<SwatchProps> = args => {
  console.log('colorSchemes[args.colorScheme]s: ', colorSchemes[args.colorScheme])
  return (
    <>
      {' '}
      <Text as="h2" sx={{color: 'text.default'}}>
        {args.colorScheme}
      </Text>
    </>
  )
}
colorScale.args = {
  colorScheme: 'light',
  size: 24
}
colorScale.argTypes = {
  colorScheme: {
    options: Object.keys(colorSchemes),
    control: {
      type: 'select'
    },
    table: {defaultValue: {summary: 'light'}}
  },
  hex: {
    table: {
      disable: true
    }
  },
  size: {
    table: {
      disable: true
    }
  }
}
colorScale.storyName = 'Color Scales'
