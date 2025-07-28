import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />)
    expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument()
  })
})
