import {act, renderHook} from '@testing-library/react-hooks';
import {useDebounce} from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  test('should return the initial value immediately', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  test('should debounce the value after the delay', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'initial', delay: 500},
      },
    );

    rerender({value: 'new value', delay: 500});

    // Initially, the value should not be updated
    expect(result.current).toBe('initial');

    // Fast forward the timers by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now, the debounced value should be updated
    expect(result.current).toBe('new value');
  });

  test('should update debounced value only after the specified delay', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'initial', delay: 500},
      },
    );

    rerender({value: 'new value', delay: 500});

    // Fast forward the timers by less than the delay time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should not have updated yet
    expect(result.current).toBe('initial');

    // Fast forward the remaining time
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now, the debounced value should be updated
    expect(result.current).toBe('new value');
  });

  test('should reset debounce timer if value changes within delay period', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'initial', delay: 500},
      },
    );

    rerender({value: 'new value', delay: 500});

    // Fast forward the timers by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should not have updated yet
    expect(result.current).toBe('initial');

    // Change the value again before the delay period completes
    rerender({value: 'another value', delay: 500});

    // Fast forward the timers by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should still not have updated because the timer was reset
    expect(result.current).toBe('initial');

    // Fast forward the remaining time
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now, the debounced value should be updated to the latest value
    expect(result.current).toBe('another value');
  });
});
