from PIL import Image
import numpy as np

# Open original logo
img = Image.open('assets/logo.jpg').convert('RGBA')
arr = np.array(img, dtype=np.float32)

w, h = img.size
print(f'Original size: {w}x{h}')

# Find the MTR icon mark:
# MTR letters are between y=300 and y=555, x=100 and x=925
# Let's inspect the bounding box of MTR letters:
mtr_crop = img.crop((105, 298, 925, 555))
print(f'MTR crop size: {mtr_crop.size}')

# Let's inspect how to make the background transparent for mtr_crop:
# Outside the letters, the color is white (~(253, 253, 253)).
# The arrow inside R is also white.
# How do we distinguish the arrow from the background?
# The arrow is located inside the R letter (roughly x from 600 to 820 in the crop, y from 30 to 240).
# Let's do a flood-fill from the 4 corners of mtr_crop:
m_arr = np.array(mtr_crop)
mask = np.zeros((m_arr.shape[0], m_arr.shape[1]), dtype=bool)

# A pixel is background candidate if r > 240, g > 240, b > 240
is_white = (m_arr[:, :, 0] > 240) & (m_arr[:, :, 1] > 240) & (m_arr[:, :, 2] > 240)

# We can use BFS from image border to find all connected white pixels
from collections import deque

queue = deque()
visited = np.zeros_like(is_white, dtype=bool)

# Enqueue border pixels that are white
H, W = is_white.shape
for r in range(H):
    for c in [0, W - 1]:
        if is_white[r, c] and not visited[r, c]:
            visited[r, c] = True
            queue.append((r, c))

for c in range(W):
    for r in [0, H - 1]:
        if is_white[r, c] and not visited[r, c]:
            visited[r, c] = True
            queue.append((r, c))

# Also enqueue white areas between M and T, between T and R from top & bottom
while queue:
    cr, cc = queue.popleft()
    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
        nr, nc = cr + dr, cc + dc
        if 0 <= nr < H and 0 <= nc < W:
            if not visited[nr, nc] and is_white[nr, nc]:
                visited[nr, nc] = True
                queue.append((nr, nc))

print(f'Total background white pixels found: {np.sum(visited)}')
# Check if white arrow was touched:
# Arrow is roughly at r=100, c=600 in mtr_crop
print(f'Is (100, 600) visited? {visited[100, 600]} (value={m_arr[100, 600]})')

# Now let us create the transparent image with smooth alpha anti-aliasing!
result = m_arr.copy()

# For smooth anti-aliased edges, compute distance or threshold
# Any visited pixel gets alpha = 0
alpha = np.ones((H, W), dtype=np.uint8) * 255
alpha[visited] = 0

# For border pixels adjacent to visited, do smooth anti-aliasing
for r in range(H):
    for c in range(W):
        if not visited[r, c]:
            # check neighbor visited count
            # if color is near white, feather it
            brightness = np.mean(m_arr[r, c, :3])
            if brightness > 220:
                # feather
                alpha[r, c] = int(max(0, 255 - (brightness - 220) * (255 / 35)))

result[:, :, 3] = alpha

out_img = Image.fromarray(result)
out_img.save('assets/logo-mark-transparent.png')
print('Saved assets/logo-mark-transparent.png successfully!')
