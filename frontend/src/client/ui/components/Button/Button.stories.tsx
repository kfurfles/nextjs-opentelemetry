import type { ComponentStory, Meta, StoryObj } from '@storybook/react'

import { UIeButton, UIButtonProps } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UIeButton> = {
  title: 'UI/Button',
  component: UIeButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UIeButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "blue",
    children: "Teste"
  },
}

