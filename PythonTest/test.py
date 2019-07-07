import sys
import os
import shutil
from mutagen.flac import FLAC
from mutagen.m4a import M4A
from mutagen.mp4 import MP4
from mutagen.dsf import DSF

print("⭐⭐⭐⭐⭐⭐")
music_path = "/Users/ygcmst/Music/MyMusic/music"
flac_path = "/Users/ygcmst/Music/FLAC"
# print(os.listdir(musicPath))


def find_all_files(directory):
    """引数のディレクトリ内のファイル名を返す

    Arguments:
        directory {[string]} -- [description]
    """
    for root, dirs, files in os.walk(directory):
        yield root
        for file in files:
            yield os.path.join(root, file)


for file in find_all_files(music_path):
    ext = os.path.splitext(file)[1]
    if ext == ".dsf":
        print(DSF(file)["TALB"])
    elif ext == ".flac":
        print(FLAC(file)["album"][0])
    # print(EasyID3(file).pprint())

test_path = "/Users/ygcmst/Music/MyMusic/music/TM NETWORK/RAINBOW RAINBOW/07 金曜日のライオン (Take it to the lucky).flac"
tag = FLAC(test_path)
print(type(tag["album"]))
# print(tag.pprint())
# print("⭐⭐⭐⭐⭐⭐")

# mp4_path="/Users/ygcmst/Music/MyMusic/music/pomme'tto/APPRISM/07 サンダンジャンプ.m4a"
mp4_path = "/Users/ygcmst/Music/MyMusic/music/白石紬 (南早紀)/THE IDOLM@STER MILLION LIVE! M@STER SPARKLE 01/04 瑠璃色金魚と花菖蒲.mp4"
# tag2=MP4(mp4_path)
print(os.path.splitext(mp4_path)[1])
# print(tag2.pprint())
