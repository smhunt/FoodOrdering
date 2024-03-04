import { View, FlatList } from 'react-native';
import products from '@/assets/data/products';  
import ProductListItem from '@/src/components/ProductListItem';   

export default function MenuScreen() {

  return (

  <FlatList data={products}
    renderItem={({ item }) => <ProductListItem product={item} />}
   numColumns={2}
  
  ></FlatList>

  );
}

