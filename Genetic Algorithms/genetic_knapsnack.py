import time
import random

# the problem inputs
weight_list = [10,20,30]
price_list = [60,100,120]
max_weight = 50
n = 3

class chromosome:
    def __init__(self,n:int):
        self.p = ""
        for i in range(n):
            self.p = self.p+"01"[random.randint(0,1)]
    def crossover(self,c):
        temp = self.p[int(len(self.p)/2)::]
        self.p = self.p[0:int(len(self.p)/2)] + c.p[int(len(c.p)/2)::]
        c.p = c.p[0:int(len(self.p)/2)] + temp
        return c
    def mutate(self):
        t = random.randint(0,len(self.p)-1)
        if self.p[t] == '1':
            self.p = self.p[0:t] + '0' + self.p[t+1::]
        else:
            self.p = self.p[0:t] + '1' + self.p[t+1::]
    def fitness(self,w:list,p:list,max_weight:int):
        fit_val = 0
        wt = 0
        for i in range(len(w)):
            if self.p[i]=='1':
                fit_val += p[i]
                wt = wt + w[i]
                if(wt>max_weight):
                    fit_val = 0
        return fit_val    
     

c1 = chromosome(n)
c2 = chromosome(n)
print('initial population :') 
print (c1.p)
print (c2.p)

#starting the algorithm
generation = 1
ans = 0
while generation<=10000000:
    if c1.fitness(weight_list,price_list,max_weight) >= c2.fitness(weight_list,price_list,max_weight):
        ans = c1.fitness(weight_list,price_list,max_weight)
        c1.crossover(c2)
        c2.mutate()
    else:
        ans = c2.fitness(weight_list,price_list,max_weight)
        c1.crossover(c2)
        c1.mutate()
    generation += 1
ans_string = 'final ans after {} generations : {}'.format(generation,ans)
print(ans_string)


