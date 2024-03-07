import { View } from '@/src/components/Themed';
import { Text, FlatList, ActivityIndicator } from 'react-native';
//import OrderListItem from '@/components/OrderListItem';
//import { useMyOrderList } from '@/api/orders';

export default function OrdersScreen() {
  /*const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }*/

  return (
    <View>
        <Text>Orders Index</Text>
    </View>
    /*<FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
    */
  );
}