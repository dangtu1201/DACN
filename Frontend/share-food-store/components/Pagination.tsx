import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';

const PAGE_SIZE = 10; // Number of items to show per page

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPress: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPress }: PaginationProps) {
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);
  
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => onPress(page)}
            style={{
              backgroundColor: currentPage === page ? 'gray' : 'white',
              padding: 8,
              margin: 4,
              borderRadius: 4,
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };