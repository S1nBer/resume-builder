import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorList from './ErrorList';

describe('ErrorList', () => {
  it('should render nothing if errors array is empty', () => {
    const { container } = render(<ErrorList errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render list of errors', () => {
    render(<ErrorList errors={['Ошибка 1', 'Ошибка 2']} />);

    expect(screen.getByText('Ошибка 1')).toBeInTheDocument();
    expect(screen.getByText('Ошибка 2')).toBeInTheDocument();
  });
});
