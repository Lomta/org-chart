import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/THE AVATARS AND THEIR FRIENDS/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Cards', () => {
  it('renders first card', () => {
    render(<App />);
  
    const cardElement = screen.getByText(/Kyoshi/i);
    expect(cardElement).toBeInTheDocument();
  })

  it("doesn't render Roku ", () => {
    render(<App />);
    const cardElement = screen.queryByText(/Roku/i);
    expect(cardElement).not.toBeInTheDocument();
  }) 

  it("renders new level after selecting a card", () => {
    render(<App />);
    const kyoshiCard = screen.getByText("Kyoshi");
    fireEvent.click(kyoshiCard)
    const rokuCard = screen.getByText("Roku");
    expect(rokuCard).toBeInTheDocument();
    
  }) 

})
