import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
    it("renders primary variant correctly", () => {
        const { asFragment } = render(<Button>Primary Action</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders secondary variant correctly", () => {
        const { asFragment } = render(<Button variant="secondary">Secondary Action</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders loading state", () => {
        const { asFragment } = render(<Button loading>Loading...</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders disabled state", () => {
        const { asFragment } = render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
        expect(asFragment()).toMatchSnapshot();
    });
});
