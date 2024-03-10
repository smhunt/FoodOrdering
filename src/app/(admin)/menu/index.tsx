import { FlatList,Text } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';   
import { ActivityIndicator } from 'react-native';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {   

  const {data:products,error,isLoading} = useProductList();

  if (isLoading){
    return <ActivityIndicator />;
  }

  if(error){
    return <Text>failed to fetch products</Text>;
  }



  return (

  <FlatList data={products}
    renderItem={({ item }) => <ProductListItem product={item} />}
   numColumns={2}
  contentContainerStyle={{gap: 10, padding: 10 }}
  columnWrapperStyle={{gap: 10}}
  ></FlatList>

  );
}

