import random
import string
import pyperclip
from datetime import datetime, timedelta

# 関数: ランダムな文字列を生成
def random_string(length=16):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

# 関数: ランダムな日付を生成
def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

# 関数: ランダムなユーザー名を生成
def random_username():
    return ''.join(random.choice(string.ascii_lowercase) for _ in range(7))

# 関数: ランダムな日本人名を生成
def random_japanese_name():
    first_names = ["太郎", "次郎", "花子", "佳稀", "優"]
    last_names = ["佐藤", "鈴木", "高橋", "田中", "高林"]
    first_name_kana = ["たろう", "じろう", "はなこ", "よしき", "ゆう"]
    last_name_kana = ["さとう", "すずき", "たかはし", "たなか", "たかばやし"]
    index = random.randint(0, len(first_names) - 1)
    return first_names[index], last_names[index], first_name_kana[index], last_name_kana[index]

# 関数: ランダムな電子メールを生成
def random_email(username):
    domains = ["example.com", "sample.org", "demo.net", "gaogao.asia"]
    return f"{username}@{random.choice(domains)}"

# 関数: ランダムなユーザーデータを生成
def generate_user():
    hash_id = random_string()
    username = random_username()
    first_name, last_name, first_name_kana, last_name_kana = random_japanese_name()
    last_sign_in_at = random_date(datetime(2021, 1, 1), datetime.now())
    email = random_email(username)
    zendesk_user_id = random.randint(10000000000000, 99999999999999)
    hospital_hash_id = random_string()
    created_at = random_date(datetime(2020, 1, 1), datetime(2021, 1, 1))
    updated_at = random_date(created_at, datetime.now())
    is_user_admin = random.choice([True, False])

    return {
        "hashId": hash_id,
        "username": username,
        "firstName": first_name,
        "lastName": last_name,
        "firstNameKana": first_name_kana,
        "lastNameKana": last_name_kana,
        "lastSignInAt": last_sign_in_at.isoformat(),
        "email": email,
        "zendeskUserId": zendesk_user_id,
        "permissions": [],
        "hospitalHashId": hospital_hash_id,
        "createdAt": created_at.isoformat(),
        "updatedAt": updated_at.isoformat(),
        "createdBy": None,
        "updatedBy": None,
        "deletedBy": None,
        "occupations": [],
        "isSafetyControlManager": False,
        "isUserAdmin": is_user_admin,
        "isShared": False,
        "thumbnailFile": None,
        "thumbnailFileHashId": None,
        "nextInitializeStep": 0,
        "initialized": True,
        "sessionExpirationTimeSec": None
    }

# 20件のダミーデータを生成
dummy_data = [generate_user() for _ in range(20)]
print(dummy_data)

pyperclip.copy(strdummy_data)
