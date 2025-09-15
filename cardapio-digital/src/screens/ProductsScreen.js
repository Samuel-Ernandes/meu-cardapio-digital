import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen({ navigation }) {
  const { items, loading, error, reload } = useProducts();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        String(p.preco).includes(q) ||
        p.categoria.toLowerCase().includes(q)
    );
  }, [items, query]);

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Carregando produtos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
        <Button title="Recarregar" onPress={reload} />
      </View>

      <TextInput
        style={styles.search}
        placeholder="Buscar por nome, preço ou categoria"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Produto', { product: item })}
          />
        )}
        contentContainerStyle={
          filteredItems.length === 0 ? styles.listEmpty : styles.list
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 24 }}>
            <Text>Nenhum produto encontrado.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  containerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '700' },
  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  list: { paddingBottom: 16 },
  listEmpty: { flexGrow: 1, justifyContent: 'center' },
  infoText: { marginTop: 10, fontSize: 14 },
});
