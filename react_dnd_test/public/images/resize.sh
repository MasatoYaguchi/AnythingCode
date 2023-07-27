#!/bin/bash
for i in *.png; do
    ffmpeg -i "$i" -vf "scale=iw*0.5:ih*0.5,crop=500:50" "smaller_$i"
done
