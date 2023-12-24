import json
import random
import pyperclip
from datetime import datetime, timedelta

# 関数: ランダムな日付を生成してミリ秒で返す


def random_date(start, end):
    return start + timedelta(
        milliseconds=random.randint(
            0, int((end - start).total_seconds() * 1000)),
    )

# ダミーデータの生成


def generate_dummy_data(num_items):
    statuses = ["項目_1",
                "項目_2",
                "項目_3",
                "項目_4",
                "項目_5",
                "項目_6",
                "項目_7",
                "項目_8",
                "項目_9",
                "項目_10",
                "項目_11",
                "項目_12",
                "項目_13",
                "項目_14",
                "項目_15",
                "項目_16",
                "項目_17",
                "項目_18",
                "項目_19",
                "項目_20",]
    dummy_data = []

    for _ in range(num_items):
        status = random.choice(statuses)
        random_date_str = random_date(
            datetime(2023, 1, 1), datetime.now()).isoformat()
        dummy_data.append({"label": status, "value": random_date_str})

    return json.dumps(dummy_data, ensure_ascii=False, indent=2)


# 20件のダミーデータを生成
dummy_data_json = generate_dummy_data(20)
pyperclip.copy(str(dummy_data_json))
