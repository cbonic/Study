package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserUpdateRequest;
import com.example.demo.entity.GenderEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.dao.UserMapper;

import java.util.Map;
import java.util.LinkedHashMap;

/**
 * ユーザー情報 Service
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class UserService {
	private static final String DUPLICATE_EMAIL_MESSAGE =
	        "メールアドレスが重複しています";
	
  /**
   * ユーザー情報 Mapper
   */
  @Autowired
  private UserMapper userMapper;


  /**
   * ユーザー情報 全検索
   * @return 検索結果
   */
  public List<UserEntity> searchAll() {
    return userMapper.findAll();
  }

  /**
   * ユーザー情報 主キー検索
   * @return 検索結果
   */
  public UserEntity findById(Integer id) {

      return userMapper.getOne(id);
  }

  /**
   * ユーザー情報 新規登録
   * @param userRequest リクエストデータ
   */
  public void create(UserRequest userRequest) {
      // メールアドレスの重複件数を確認
      int emailCount = userMapper.countByEmail(userRequest.getEmail());
      if (emailCount != 0) {
          throw new IllegalArgumentException(DUPLICATE_EMAIL_MESSAGE);
      }

      // 作成日・更新日に同じ現在時刻を設定
      Date now = new Date();
      // リクエスト値をエンティティに詰め替え
      UserEntity user = new UserEntity();
      user.setName(userRequest.getName());
      user.setAddress(userRequest.getAddress());
      user.setPhone(userRequest.getPhone());
      user.setEmail(userRequest.getEmail());
      user.setGenderId(userRequest.getGenderId());
      user.setCreateDate(now);
      user.setUpdateDate(now);

      // 新規ユーザーを登録
      userMapper.userSave(user);
  }

    /**
   * 性別マスタをMapで取得（genderId, genderName）
   * @return 性別Map
   */
  public Map<Integer, String> getGenderMap() {
      // 性別マスタを取得
      List<GenderEntity> genders = userMapper.findAllGender();
      // 画面表示順を維持するためにLinkedHashMapを使用
      Map<Integer, String> genderMap = new LinkedHashMap<Integer, String>();

      for (GenderEntity gender : genders) {
          // 性別IDと性別名称を取得
          Integer genderId = gender.getGenderId();
          String genderName = gender.getGenderName();
          // IDが取得できたレコードのみMapに格納
          if (genderId != null) {
              genderMap.put(genderId, genderName);
          }
      }
      return genderMap;
  }
  
  /**
   * ユーザー情報 更新
   * @param userUpdateRequest リクエストデータ
   */
  public void update(UserUpdateRequest userUpdateRequest) {
      // 自身のIDを除外したうえでメールアドレスの重複件数を確認
      int emailCount = userMapper.countByEmailExcludeId(userUpdateRequest.getId(), userUpdateRequest.getEmail());
      if (emailCount != 0) {
          throw new IllegalArgumentException(DUPLICATE_EMAIL_MESSAGE);
      }

      // 更新対象ユーザーを取得し、リクエスト値で上書き
      UserEntity user = findById(userUpdateRequest.getId());
      user.setAddress(userUpdateRequest.getAddress());
      user.setName(userUpdateRequest.getName());
      user.setPhone(userUpdateRequest.getPhone());
      user.setEmail(userUpdateRequest.getEmail());
      user.setGenderId(userUpdateRequest.getGenderId());
      // 更新日時のみ現在時刻に更新
      user.setUpdateDate(new Date());
      // ユーザー情報を更新
      userMapper.userUpdate(user);
  }
  
  public void delete(Integer id) {
      userMapper.userDelete(id);
  }
}