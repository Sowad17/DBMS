package com.example.ojb.dto;

import org.hibernate.HibernateException;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.descriptor.converter.spi.BasicValueConverter;
import org.hibernate.type.descriptor.jdbc.JdbcType;
import org.hibernate.type.spi.TypeConfiguration;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.*;

public class CourseType implements UserType {
    //////////////////////////////////////

    private static final int SQL_TYPE = Types.STRUCT;
    private static final String OBJECT_TYPE = "COURSE_TYPE";

    @Override
    public int getSqlType() {
        return SQL_TYPE;
    }

    @Override
    public Class returnedClass() {
        return Course.class;
    }

    @Override
    public boolean equals(Object o, Object j1) throws HibernateException {
        if (o == j1) return true;
        if (o == null || j1 == null) return false;
        return true;
    }

    @Override
    public int hashCode(Object o) {
        return 0;
    }

    @Override
    public Object nullSafeGet(ResultSet resultSet, int i, SharedSessionContractImplementor sharedSessionContractImplementor, Object o) throws SQLException, HibernateException {
        final Struct struct = (Struct) resultSet.getObject(i);
        if (resultSet.wasNull()) {
            return null;
        }
        final Object[] attributes = struct.getAttributes();
        final String course_name = (String) attributes[0];
        final double course_type = (double) attributes[1];
        return new Course(course_name, course_type);
    }

    @Override
    public void nullSafeSet(PreparedStatement preparedStatement, Object o, int i, SharedSessionContractImplementor sharedSessionContractImplementor) throws SQLException {
        if (o == null) {
            preparedStatement.setNull(i, SQL_TYPE, OBJECT_TYPE);
        } else {
            final Course courseType = (Course) o;
            final Object[] values = new Object[]{courseType.getCourse_name(), courseType.getCourse_credit()};
            final Connection connection = preparedStatement.getConnection();
            final Struct struct = connection.createStruct(OBJECT_TYPE, values);
            preparedStatement.setObject(i, struct, SQL_TYPE);
        }

    }

    @Override
    public Object deepCopy(Object o) throws HibernateException {
        if(o == null) return null;
        return new Course(((Course) o).getCourse_name(), ((Course) o).getCourse_credit());
    }

    @Override
    public boolean isMutable() {
        return true;
    }

    @Override
    public Serializable disassemble(Object o) {
        return null;
    }

    @Override
    public Object assemble(Serializable serializable, Object o) {
        return null;
    }

    @Override
    public Object replace(Object detached, Object managed, Object owner) {
        return UserType.super.replace(detached, managed, owner);
    }

    @Override
    public long getDefaultSqlLength(Dialect dialect, JdbcType jdbcType) {
        return UserType.super.getDefaultSqlLength(dialect, jdbcType);
    }

    @Override
    public int getDefaultSqlPrecision(Dialect dialect, JdbcType jdbcType) {
        return UserType.super.getDefaultSqlPrecision(dialect, jdbcType);
    }

    @Override
    public int getDefaultSqlScale(Dialect dialect, JdbcType jdbcType) {
        return UserType.super.getDefaultSqlScale(dialect, jdbcType);
    }

    @Override
    public JdbcType getJdbcType(TypeConfiguration typeConfiguration) {
        return UserType.super.getJdbcType(typeConfiguration);
    }

    @Override
    public BasicValueConverter getValueConverter() {
        return UserType.super.getValueConverter();
    }
    /////////////////////////////////////
}
