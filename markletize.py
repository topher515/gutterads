from urllib import quote

def markletize(strn):
    strn.replace('\n','')
    #q_strn = quote(strn, safe="()';+!=,/?&")
    q_strn = strn # Actually maybe we dont need to escape everything
    return 'javascript:' + q_strn
    
if __name__ == "__main__":
    import sys
    fname = sys.argv[1]
    print markletize(open(fname).read())