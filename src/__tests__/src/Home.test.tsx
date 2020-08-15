import React from 'react';
import { render } from '@testing-library/react';

import Home from '../../pages/Home';

describe('Home page', () => {
    it('has a get started button', () => {
      const { getByRole } = render(<Home />);
      expect(getByRole('button', { name: /get started/i })).toBeInTheDocument();
    });
    it('displays the app logo', () => {
      const { getByTestId } = render(<Home />);
      expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
    });
    it('shows welcome text ', () => {
      const { getByText } = render(<Home />);
      expect(getByText(/welcome to/i)).toBeInTheDocument();
    });
  });