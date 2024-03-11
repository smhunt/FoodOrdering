import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({archived:false});

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