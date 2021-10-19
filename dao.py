import datetime
import psycopg2

db = {
    "database": "sakshidb",
    "user": "",
    "password": "",
    "host": "127.0.0.1",
    "port": "5432",
    "table": "object"
}


def create_connection():
    # establishing the connection
    try:
        conn = psycopg2.connect(
            database=db['database'], user=db['user'], password=db['password'], host=db['host'], port=db['port']
        )
    except ConnectionError as e:
        return e
    return conn


def close_connection(conn):
    try:
        conn.close()
    except Exception as e:
        return e


def get_data():
    # Creating a cursor test using the cursor() method
    conn = create_connection()
    cursor = conn.cursor()

    # Executing an PostgreSQL function using the execute() method
    cursor.execute("SELECT id, city, start_date, end_date, price, status, color FROM {}".format(db['table']))

    results = []
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    for i in range(len(results)):
        startdate = results[i]['start_date']
        x = datetime.datetime(startdate.year, startdate.month, startdate.day)
        results[i]['start_date'] = x.strftime("%Y-%m-%d")
        enddate = results[i]['end_date']
        y = datetime.datetime(enddate.year, enddate.month, enddate.day)
        results[i]['end_date'] = y.strftime("%Y-%m-%d")
    # Closing the connection
    close_connection(conn)
    return results


def edit_data(preEditData, postEditData):
    # establishing the connection
    conn = create_connection()
    # Creating a cursor test using the cursor() method
    cursor = conn.cursor()
    for key in preEditData:
        query = "UPDATE %s SET %s = '%s' WHERE id = '%s'" % (db['table'],key, postEditData[key], preEditData['id'])
        cursor.execute(query)
        conn.commit()

    # Closing the connection
    close_connection(conn)
    return 'Updated'


def delete_data(id):
    # establishing the connection
    conn = create_connection()
    # Creating a cursor test using the cursor() method
    cursor = conn.cursor()

    query = "DELETE FROM %s WHERE id = '%s'" % (db['table'],id)
    cursor.execute(query)
    conn.commit()

    # Closing the connection
    close_connection(conn)
    return 'Deleted'


def insert_data(data):
    # establishing the connection
    conn = create_connection()
    # Creating a cursor test using the cursor() method
    cursor = conn.cursor()
    query = "INSERT INTO %s VALUES ('%s'," % (db['table'],get_id())
    for key in data:
        # print (key)
        # print( data[key])
        query += "'%s'," % data[key]
    query = query[:-1] + ");"
    print(query)
    cursor.execute(query)
    conn.commit()

    # Closing the connection
    close_connection(conn)
    return 'Inserted'


def get_id():
    id = 1
    # establishing the connection
    conn = create_connection()
    # Creating a cursor test using the cursor() method
    cursor = conn.cursor()
    query = "SELECT MAX(id) FROM %s" % db['table']
    cursor.execute(query)
    for row in cursor:
        id = row[0] + 1
    print(id)
    # query = ""
    # cursor.execute(query)
    conn.commit()

    # Closing the connection
    close_connection(conn)
    return id


def filter_data(dates):
    # establishing the connection
    conn = create_connection()
    # Creating a cursor test using the cursor() method
    cursor = conn.cursor()
    query = "SELECT id, city, start_date, end_date, price, status, color FROM %s WHERE start_date >= '%s' AND end_date  <= '%s'" % (db['table'],
                                                                                 dates['start_date'], dates['end_date'])
    print(query)
    # Executing an PostGre function using the execute() method

    cursor.execute(query)

    results = []
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    for i in range(len(results)):
        startdate = results[i]['start_date']
        x = datetime.datetime(startdate.year, startdate.month, startdate.day)
        results[i]['start_date'] = x.strftime("%Y-%m-%d")
        enddate = results[i]['end_date']
        y = datetime.datetime(enddate.year, enddate.month, enddate.day)
        results[i]['end_date'] = y.strftime("%Y-%m-%d")

    # Closing the connection
    close_connection(conn)
    return results
