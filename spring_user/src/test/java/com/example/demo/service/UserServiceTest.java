package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dao.UserMapper;
import com.example.demo.entity.UserEntity;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void searchAllTest() {

        UserEntity user1 = new UserEntity();
        user1.setId(1);
        user1.setName("田中");

        UserEntity user2 = new UserEntity();
        user2.setId(2);
        user2.setName("鈴木");

        List<UserEntity> expected = List.of(user1, user2);

        when(userMapper.findAll()).thenReturn(expected);

        List<UserEntity> actual = userService.searchAll();

        assertEquals(expected, actual);
    }
}