// src/components/ProductCard.js
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {product.imagem && (
        <Image source={product.imagem} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{product.nome}</Text>
        <Text style={styles.price}>
          R$ {Number(product.preco).toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.desc}>{product.descricao}</Text>

        {/* Ingredientes */}
        {product.ingredientes && (
          <Text style={styles.subInfo}>
            Ingredientes: {product.ingredientes.join(', ')}
          </Text>
        )}

        {/* Alérgenos */}
        {product.alergenicos && product.alergenicos.length > 0 && (
          <Text style={styles.subInfo}>
            ⚠️ Alérgenos: {product.alergenicos.join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: '700', color: '#2e7d32', marginBottom: 4 },
  desc: { fontSize: 14, color: '#555', marginBottom: 6 },
  subInfo: { fontSize: 12, color: '#777', marginBottom: 3 },
});
