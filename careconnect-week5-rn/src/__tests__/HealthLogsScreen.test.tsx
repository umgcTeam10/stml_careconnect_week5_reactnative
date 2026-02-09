import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { HealthLogsScreen } from '@/src/screens/HealthLogsScreen';

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  setOptions: jest.fn(),
};

jest.spyOn(Alert, 'alert');

describe('HealthLogsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Health Logs')).toBeTruthy();
  });

  it('renders all summary cards', () => {
  const { getByText, getAllByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

  expect(getByText('BP Today')).toBeTruthy();
  expect(getByText('120/80')).toBeTruthy();
  expect(getByText('mmHg')).toBeTruthy();
  
  expect(getByText('Medications')).toBeTruthy();
  expect(getByText('2/2')).toBeTruthy();
  expect(getByText('Completed')).toBeTruthy();

  // Meals and Mood appear in both summary cards and tabs
  const mealsElements = getAllByText('Meals');
  expect(mealsElements.length).toBeGreaterThanOrEqual(1);
  expect(getByText('1,240')).toBeTruthy();
  expect(getByText('Calories')).toBeTruthy();
  
  const moodElements = getAllByText('Mood');
  expect(moodElements.length).toBeGreaterThanOrEqual(1);
  // REMOVED: expect(getByText('Mood')).toBeTruthy(); ← This was the problem!
  expect(getByText('Good')).toBeTruthy();
  expect(getByText('Improving')).toBeTruthy();
});

  it('renders all filter tabs', () => {
  const { getByText, getAllByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

  expect(getByText('All')).toBeTruthy();
  expect(getByText('Vitals')).toBeTruthy();
  expect(getByText('Meds')).toBeTruthy();
  
  // Meals and Mood appear in both summary cards and tabs
  const mealsElements = getAllByText('Meals');
  expect(mealsElements.length).toBeGreaterThanOrEqual(1);
  
  const moodElements = getAllByText('Mood');
  expect(moodElements.length).toBeGreaterThanOrEqual(1);
  // REMOVED: expect(getByText('Mood')).toBeTruthy(); ← This was the problem!
  
  expect(getByText('Symptoms')).toBeTruthy();
  expect(getByText('Activity')).toBeTruthy();
});

  it('selects tab when pressed', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const vitalsTab = getByTestId('tab-vitals');
    fireEvent.press(vitalsTab);

    expect(vitalsTab).toBeTruthy();
  });

  it('renders all 5 log entries', () => {
    const { getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    // Entry 1: Blood Pressure
    expect(getByText('Blood Pressure')).toBeTruthy();
    expect(getByText('120/80 mmHg')).toBeTruthy();
    
    // Entry 2: Mood Check
    expect(getByText('Mood Check')).toBeTruthy();
    expect(getByText('Feeling good today')).toBeTruthy();
    
    // Entry 3: Medication Taken
    expect(getByText('Medication Taken')).toBeTruthy();
    expect(getByText('Morning medications completed')).toBeTruthy();
    
    // Entry 4: Breakfast
    expect(getByText('Breakfast')).toBeTruthy();
    expect(getByText('Oatmeal with berries, green tea')).toBeTruthy();
    
    // Entry 5: No symptoms reported
    expect(getByText('No symptoms reported')).toBeTruthy();
    expect(getByText('Feeling well, no concerns')).toBeTruthy();
  });

  it('displays time stamps for all entries', () => {
    const { getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('1 hour ago')).toBeTruthy();
    expect(getByText('2 hours ago')).toBeTruthy();
    expect(getByText('3 hours ago')).toBeTruthy();
    expect(getByText('4 hours ago')).toBeTruthy();
    expect(getByText('1 day ago')).toBeTruthy();
  });

  it('displays tags for all entries', () => {
    const { getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('vitals')).toBeTruthy();
    expect(getByText('mood')).toBeTruthy();
    expect(getByText('medication')).toBeTruthy();
    expect(getByText('meal')).toBeTruthy();
    expect(getByText('symptoms')).toBeTruthy();
  });

  it('expands blood pressure log entry when pressed', () => {
    const { getByTestId, getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const logEntry = getByTestId('log-entry-1');
    fireEvent.press(logEntry);

    // Details should be visible
    expect(getByText('systolic: 120')).toBeTruthy();
    expect(getByText('diastolic: 80')).toBeTruthy();
    expect(getByText('heartRate: 72')).toBeTruthy();
  });

  it('expands mood check log entry when pressed', () => {
    const { getByTestId, getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const logEntry = getByTestId('log-entry-2');
    fireEvent.press(logEntry);

    expect(getByText('mood: happy')).toBeTruthy();
    expect(getByText('energy: high')).toBeTruthy();
  });

  it('expands medication log entry when pressed', () => {
    const { getByTestId, getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const logEntry = getByTestId('log-entry-3');
    fireEvent.press(logEntry);

    expect(getByText('medications: Lisinopril 10mg, Metformin 500mg')).toBeTruthy();
  });

  it('expands breakfast log entry when pressed', () => {
    const { getByTestId, getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const logEntry = getByTestId('log-entry-4');
    fireEvent.press(logEntry);

    expect(getByText('calories: 320')).toBeTruthy();
    expect(getByText('protein: 12')).toBeTruthy();
  });

  it('collapses expanded log entry when pressed again', () => {
    const { getByTestId, queryByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const logEntry = getByTestId('log-entry-1');
    
    // Expand
    fireEvent.press(logEntry);
    expect(queryByText('systolic: 120')).toBeTruthy();

    // Collapse
    fireEvent.press(logEntry);
    expect(queryByText('systolic: 120')).toBeFalsy();
  });

  it('only expands one entry at a time', () => {
    const { getByTestId, queryByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    // Expand first entry
    const entry1 = getByTestId('log-entry-1');
    fireEvent.press(entry1);
    expect(queryByText('systolic: 120')).toBeTruthy();

    // Expand second entry - first should collapse
    const entry2 = getByTestId('log-entry-2');
    fireEvent.press(entry2);
    expect(queryByText('systolic: 120')).toBeFalsy();
    expect(queryByText('mood: happy')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const backButton = getByTestId('health-logs-back');
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('shows not implemented alert when add button is pressed', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const addButton = getByTestId('health-logs-add');
    fireEvent.press(addButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('shows not implemented alert when FAB is pressed', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const fab = getByTestId('health-logs-fab');
    fireEvent.press(fab);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('renders appointment banner', () => {
    const { getByText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Now: Physical Therapy Appointment')).toBeTruthy();
    expect(getByText('02:00 PM')).toBeTruthy();
    expect(getByText('At clinic')).toBeTruthy();
    expect(getByText('View')).toBeTruthy();
  });

  it('shows not implemented alert when appointment view is pressed', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const viewButton = getByTestId('appointment-view');
    fireEvent.press(viewButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByLabelText('Back button')).toBeTruthy();
    expect(getByLabelText('Add new log')).toBeTruthy();
    expect(getByLabelText('Add new health log')).toBeTruthy();
    expect(getByLabelText('Blood Pressure log entry')).toBeTruthy();
    expect(getByLabelText('Mood Check log entry')).toBeTruthy();
    expect(getByLabelText('Medication Taken log entry')).toBeTruthy();
    expect(getByLabelText('Breakfast log entry')).toBeTruthy();
    expect(getByLabelText('No symptoms reported log entry')).toBeTruthy();
    expect(getByLabelText('Filter by All')).toBeTruthy();
    expect(getByLabelText('View appointment')).toBeTruthy();
  });

  it('has proper testIDs for all interactive elements', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByTestId('health-logs-back')).toBeTruthy();
    expect(getByTestId('health-logs-add')).toBeTruthy();
    expect(getByTestId('health-logs-scroll')).toBeTruthy();
    expect(getByTestId('tab-all')).toBeTruthy();
    expect(getByTestId('tab-vitals')).toBeTruthy();
    expect(getByTestId('tab-meds')).toBeTruthy();
    expect(getByTestId('tab-meals')).toBeTruthy();
    expect(getByTestId('tab-mood')).toBeTruthy();
    expect(getByTestId('tab-symptoms')).toBeTruthy();
    expect(getByTestId('tab-activity')).toBeTruthy();
    expect(getByTestId('log-entry-1')).toBeTruthy();
    expect(getByTestId('log-entry-2')).toBeTruthy();
    expect(getByTestId('log-entry-3')).toBeTruthy();
    expect(getByTestId('log-entry-4')).toBeTruthy();
    expect(getByTestId('log-entry-5')).toBeTruthy();
    expect(getByTestId('health-logs-fab')).toBeTruthy();
    expect(getByTestId('appointment-view')).toBeTruthy();
  });

  it('renders with scrollable content', () => {
    const { getByTestId } = render(<HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />);

    const scrollView = getByTestId('health-logs-scroll');
    expect(scrollView).toBeTruthy();
  });
});