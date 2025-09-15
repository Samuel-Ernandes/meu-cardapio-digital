// src/screens/ProductDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      {product.imagem && (
        <Image source={product.imagem} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{product.nome}</Text>
        <Text style={styles.price}>
          R$ {Number(product.preco).toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.desc}>{product.descricao}</Text>

        <Text style={styles.section}>Ingredientes:</Text>
        <Text>{product.ingredientes.join(', ')}</Text>

        <Text style={styles.section}>Modo de preparo:</Text>
        <Text>{product.preparoDetalhado}</Text>

        {product.alergenicos?.length > 0 && (
          <>
            <Text style={styles.section}>⚠️ Alérgenos:</Text>
            <Text>{product.alergenicos.join(', ')}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  price: { fontSize: 18, fontWeight: '700', color: '#2e7d32', marginBottom: 12 },
  desc: { fontSize: 15, color: '#444', marginBottom: 16 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 12 },
});
