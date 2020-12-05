import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherInfo from "../../../WeatherInfo";

const setup = () => {
  const utils = render(<WeatherInfo />);
  const input = utils.getByTestId("city-input");
  const button = utils.getByTestId("unit-switch");
  return {
    input,
    button,
    ...utils,
  };
};

test("The initial input is the default city name 'Melbourne'", () => {
  const { input } = setup();
  expect(input.value).toBe("Melbourne");
});

test("a11y input should have a city-input", () => {
  render(<WeatherInfo />);
  const input = screen.getByLabelText("Search City");
  expect(input).toHaveAttribute("id", "city-input");
});

test("The input field should be changed while the change event trigger", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "Sydney" } });
  expect(input.value).toBe("Sydney");
});

test("Switch unit button for the click event", () => {
  const { button } = setup();
  fireEvent.click(button);
  expect(button.textContent).toBe("Switch to ºc");
});
