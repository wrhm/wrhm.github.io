# topics = '''Cat videos
# Cat pictures
# Pairs of (designer) crocs
# Places with the name Laurel in them
# Saxophones
# Drums
# Snarky Puppy
# Postmodern Jukebox
# Pentatonix
# Chicken recipes
# College orientation photos that pale to CMU's
# Bizarre Pennsylvania town names
# Buzzfeed listicles (you won't believe #7!)
# Reasons to become a cat lady (?)
# Things to do on a rainy day
# Pictures of baby animals that are kittens
# Pictures of baby animals that aren't kittens
# Songs to get stuck in your head
# Words you can spell with the letters in your name
# Plants that look like laurels but aren't
# Minty snacks/desserts
# Reasons you're awesome'''
# for topic in topics.split('\n'):
# 	for i in xrange(22):
# 		print '%s\t%d'%(topic,i+1)

# import re

# print 'Cat Pictures'
# f = open('cat_images.txt','r')
# text = f.read()
# f.close()
# needle = r'data\:image[^\]]+\"\]'
# results = re.findall(needle,text)
# results += 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6FPIE65DC-Ad2LYLz8URRkyLRoVcx-qSBM3aRF2AJB-CthtR3 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAbwo7tE3kESo0dyycsOdP1PkXjtsAYMkuXcMEb23o4_5IlzAt https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSJl4kEoCrGaUhB18MrpqzI128tmistqaznrCh0H6W2tFDQOON'.split()
# results = list(set(results))
# for (i,link) in enumerate(results):
# 	print link

# https://stackoverflow.com/questions/1830927/how-do-i-make-a-link-that-goes-no-where
f = open('ldb_data.txt','r')
data = f.read()
f.close()
snippet = ''
'''MAKE SURE LAST ELEM PRESENT'''
for line in data.split('\n')[1:-1]:
	fields = line.split('\t')
	assert(len(fields) == 5)
	[batch,category,index,text,link] = fields
	if batch != '':
		print '%s</p>'%snippet
		snippet = '<p><strong>%s. %s</strong>: <a target="_blank" href="%s">%s</a>'%(batch,category,link,text)
	else:
		snippet += ' <a target="_blank" href="%s">%s</a>'%(link,text)
print '%s</p>'%snippet
