import { expect, fn } from 'storybook/test'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    onClick: fn(),
  },
}

export const Restart = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Restart',
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /restart/i })

    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const NewGame = {
  args: {
    variant: 'secondary',
    className: 'px-6',
    children: 'New Game',
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /new game/i })

    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(args.onClick).toHaveBeenCalledOnce()
  }
}