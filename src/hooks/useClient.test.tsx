import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {ClientContext} from '../context/ClientContext';
import {useClient} from './useClient';

describe('useClient', () => {
  test('should return the client context value', () => {
    const mockContext = {
      client: null,
      setClient: () => {},
      loading: false,
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ClientContext.Provider value={mockContext}>
        {children}
      </ClientContext.Provider>
    );

    const {result} = renderHook(() => useClient(), {wrapper});

    expect(result.current).toBe(mockContext);
  });

  test('should return null if no client context value is provided', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      // @ts-ignore-next-line
      <ClientContext.Provider value={null}>{children}</ClientContext.Provider>
    );

    const {result} = renderHook(() => useClient(), {wrapper});

    expect(result.current).toBeNull();
  });
});
