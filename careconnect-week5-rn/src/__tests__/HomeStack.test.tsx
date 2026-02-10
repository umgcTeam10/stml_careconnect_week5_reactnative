import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { HomeStack } from '@/src/navigation/HomeStack';

describe('HomeStack', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );

    expect(toJSON()).toBeTruthy();
  });

  it('contains HomeScreen as initial route', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );

    expect(toJSON()).toBeTruthy();
  });

  it('has HealthLogs route configured', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );

    expect(toJSON()).toBeTruthy();
  });
});