import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({archived:false});

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Active' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}