import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherInfo from "../../../WeatherInfo";

import { getWeatherForcast as MockGetWeatherForcast } from "../../../../apis/weather";
jest.mock("../../../../apis/weather");

const setup = () => {
  const utils = render(<WeatherInfo />);
  const input = utils.getByTestId("city-input");
  const searchButton = utils.getByTestId("city-search");
  const button = utils.getByTestId("unit-switch");
  return {
    input,
    button,
    searchButton,
    ...utils,
  };
};

function searchNewCityMock() {}

// simulate real world api delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("The initial input is the default city name 'Melbourne'", () => {
  const { input } = setup();
  expect(input.value).toBe("Melbourne");
});

test("a11y input should have a city-input", () => {
  render(<WeatherInfo />);
  const input = screen.getByLabelText("Please enter a city name");
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

test("Search city button for the click event", () => {
  const { button } = setup();
  fireEvent.click(button);
  expect(button.textContent).toBe("Switch to ºc");
});

test("function called test", async () => {
  const { input, searchButton } = setup();
  expect(MockGetWeatherForcast).toHaveBeenCalledTimes(1);
  fireEvent.change(input, { target: { value: "Sydney" } });
  fireEvent.click(searchButton);
  expect(MockGetWeatherForcast).toHaveBeenCalledTimes(2);
});
