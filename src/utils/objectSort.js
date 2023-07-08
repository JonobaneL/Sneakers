export const objectSort = (arr)=>{
    const results = []
    const res = arr.reduce((prev,current)=>{
      return {
        ...prev,
        [current.id]:{
          ...current
        }
      }

    },{})

    Object.values(res).forEach((child) => {
      if (child.parent) {
          if (res[child.parent]) {
              const parent = res[child.parent];
              if (!parent.children) {
                  parent.children = [];
              }

              parent.children.push(child)
          }
      } else {
        results.push(child);
      }
  })
    return results
  }