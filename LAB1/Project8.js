import React from 'react';
import { SectionList, Text, View, StyleSheet, SafeAreaView
} from 'react-native';

const people = [
    { name: { first: 'Minh', last: 'Khang' } },
    { name: { first: 'Anh', last: 'Thư' } },
    { name: { first: 'Hoàng', last: 'Nam' } },
    { name: { first: 'Mai', last: 'Chi' } },
    { name: { first: 'Quốc', last: 'Bảo' } },
    { name: { first: 'Thùy', last: 'Trang' } },
    { name: { first: 'Đức', last: 'Anh' } },
    { name: { first: 'Lan', last: 'Phương' } },
    { name: { first: 'Trọng', last: 'Nghĩa' } }
];

const groupByLastName = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const letter = item.name.last[0].toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = { title: letter, data: [] };
    }
    grouped[letter].data.push(item);
  });

  return Object.values(grouped).sort((a, b) => a.title.localeCompare(b.title));
};

const Project8 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Danh sách</Text>
      <SectionList
        sections={groupByLastName(people)}
        keyExtractor={(item, index) => `${item.name.first}-${index}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default Project8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 16,
  },
});
