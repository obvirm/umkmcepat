import { expect, fn } from "storybook/test";

import { Button } from "@/components/ui/button";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  args: {
    children: "Buat website",
    onClick: fn(),
  },
  argTypes: {
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "link",
        "destructive",
      ],
    },
  },
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { children: "Lihat contoh", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "Nanti dulu", variant: "outline" },
};

export const Destructive: Story = {
  args: { children: "Hapus", variant: "destructive" },
};

export const Disabled: Story = {
  args: { children: "Menunggu", disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Menunggu" });
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
